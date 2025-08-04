/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { reportId } = await params;
    const body = await request.json();
    const { status, action, adminNotes } = body; // action: 'dismiss' or 'remove'

    // Find the report in the database
    const report = await prisma.contentReport.findUnique({
      where: { id: reportId },
      include: {
        recipe: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        reporter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!report) {
      return NextResponse.json({ message: 'Report not found' }, { status: 404 });
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update the report status
      const updatedReport = await tx.contentReport.update({
        where: { id: reportId },
        data: {
          status: status.toUpperCase(),
          notes: adminNotes,
          updatedAt: new Date()
        },
        include: {
          recipe: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          },
          reporter: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // If action is 'remove' (not 'dismiss'), handle the recipe removal
      if (action === 'remove' && report.recipe) {
        const recipeAuthorId = report.recipe.author.id;

        // Create a user strike
        await tx.userStrike.create({
          data: {
            userId: recipeAuthorId,
            reason: 'Inappropriate content',
            recipeId: report.recipeId,
            recipeTitle: report.recipeTitle,
            adminId: session.user.id
          }
        });

        // Count user's total strikes
        const userStrikeCount = await tx.userStrike.count({
          where: { userId: recipeAuthorId }
        });

        // Delete the recipe
        await tx.recipe.delete({
          where: { id: report.recipeId }
        });

        // Check if user should be banned (2+ strikes)
        if (userStrikeCount >= 2) {
          // Update user role to indicate ban
          await tx.user.update({
            where: { id: recipeAuthorId },
            data: { role: 'BANNED' }
          });
        }

        // Create admin notification
        const notificationTitle = userStrikeCount >= 2 
          ? 'User Banned - Recipe Permanently Deleted'
          : 'Recipe Permanently Deleted';
          
        const notificationMessage = userStrikeCount >= 2
          ? `Recipe "${report.recipeTitle}" was permanently deleted. User received strike #${userStrikeCount} and has been automatically banned.`
          : `Recipe "${report.recipeTitle}" was permanently deleted due to inappropriate content. User received strike #${userStrikeCount}.`;

        await tx.adminNotification.create({
          data: {
            type: userStrikeCount >= 2 ? 'USER_BANNED' : 'RECIPE_REMOVED',
            title: notificationTitle,
            message: notificationMessage,
            recipeId: report.recipeId,
            recipeTitle: report.recipeTitle,
            userId: recipeAuthorId,
            adminId: session.user.id,
            reason: 'Inappropriate content'
          }
        });

        return {
          report: updatedReport,
          strikeCount: userStrikeCount,
          recipeRemoved: true,
          userBanned: userStrikeCount >= 2
        };
      }

      return {
        report: updatedReport,
        strikeCount: 0,
        recipeRemoved: false,
        userBanned: false
      };
    });

    console.log(`Content report ${reportId} updated to status: ${status}`);

    return NextResponse.json({ 
      message: 'Report updated successfully',
      report: {
        id: result.report.id,
        recipeId: result.report.recipeId,
        recipeTitle: result.report.recipeTitle,
        recipeSlug: result.report.recipeSlug,
        status: result.report.status.toLowerCase(),
        notes: result.report.notes,
        createdAt: result.report.createdAt.toISOString(),
        updatedAt: result.report.updatedAt.toISOString(),
        reporter: result.report.reporter,
        recipe: result.report.recipe
      },
      strikeCount: result.strikeCount,
      recipeRemoved: result.recipeRemoved,
      userBanned: result.userBanned
    });

  } catch (error) {
    console.error('Error updating content report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 