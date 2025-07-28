/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { revalidateTag } from 'next/cache';

interface ContentReport {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  userId: string;
  userEmail: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

interface UserStrike {
  id: string;
  userId: string;
  reason: string;
  recipeId?: string;
  recipeTitle?: string;
  adminId: string;
  adminName: string;
  createdAt: string;
}

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
    const { status, action } = body; // action: 'dismiss' or 'remove'

    // Read the content reports file
    const reportsFile = join(process.cwd(), 'content-reports.json');
    if (!existsSync(reportsFile)) {
      return NextResponse.json({ message: 'No content reports found' }, { status: 404 });
    }

    const fileContent = readFileSync(reportsFile, 'utf-8');
    const reports: ContentReport[] = JSON.parse(fileContent);
    
    const report = reports.find((r: ContentReport) => r.id === reportId);
    if (!report) {
      return NextResponse.json({ message: 'Report not found' }, { status: 404 });
    }

    // Update the report status
    report.status = status;
    
    // If action is 'remove' (not 'dismiss'), handle the recipe removal
    if (action === 'remove' && status === 'resolved') {
      // Get the recipe author ID
      const recipe = await prisma.recipe.findUnique({
        where: { id: report.recipeId },
        select: { authorId: true }
      });

      if (recipe) {
        const recipeAuthorId = recipe.authorId;
        
        // ACTUALLY DELETE THE RECIPE from the database
        try {
          await prisma.$transaction(async (tx) => {
            // Delete all tags associated with the recipe
            await tx.recipeTag.deleteMany({
              where: { recipeId: report.recipeId },
            });

            // Delete all votes associated with the recipe
            await tx.vote.deleteMany({
              where: { recipeId: report.recipeId },
            });

            // Delete all bookmarks associated with the recipe
            await tx.bookmark.deleteMany({
              where: { recipeId: report.recipeId },
            });

            // Delete all tried records associated with the recipe
            await tx.tried.deleteMany({
              where: { recipeId: report.recipeId },
            });

            // Delete the recipe
            await tx.recipe.delete({
              where: { id: report.recipeId },
            });
          });
          
          console.log(`Recipe ${report.recipeId} (${report.recipeTitle}) has been permanently deleted`);
          
          // Invalidate cache to ensure fresh data
          revalidateTag('recipes');
          revalidateTag('filtered-recipes');
          revalidateTag('trending-recipes');
          revalidateTag('latest-recipes');
          revalidateTag('tags');
          revalidateTag('popular-tags');
        } catch (deleteError) {
          console.error('Error deleting recipe:', deleteError);
          return NextResponse.json({ message: 'Failed to delete recipe' }, { status: 500 });
        }
        
        // Read the user strikes file
        const strikesFile = join(process.cwd(), 'user-strikes.json');
        let strikes: UserStrike[] = [];
        if (existsSync(strikesFile)) {
          try {
            const strikesContent = readFileSync(strikesFile, 'utf-8');
            strikes = JSON.parse(strikesContent);
          } catch (error) {
            console.error('Error reading strikes file:', error);
          }
        }
        
        const newStrike: UserStrike = {
          id: `strike_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: recipeAuthorId,
          reason: 'Inappropriate content - recipe permanently deleted',
          recipeId: report.recipeId,
          recipeTitle: report.recipeTitle,
          adminId: session.user.id,
          adminName: session.user.name || session.user.email,
          createdAt: new Date().toISOString()
        };

        strikes.push(newStrike);
        
        try {
          writeFileSync(strikesFile, JSON.stringify(strikes, null, 2));
          console.log(`Strike added to user ${recipeAuthorId} for recipe: ${report.recipeTitle}`);
          
          // Check if user should be banned (2+ strikes)
          const userStrikeCount = strikes.filter((strike: UserStrike) => strike.userId === recipeAuthorId).length;
          
          if (userStrikeCount >= 2) {
            // Automatically ban the user
            try {
              const banResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/users/${recipeAuthorId}/ban`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  reason: `Automatic ban after ${userStrikeCount} content violations` 
                })
              });
              
              if (banResponse.ok) {
                console.log(`User ${recipeAuthorId} automatically banned after ${userStrikeCount} strikes`);
              }
            } catch (banError) {
              console.error('Error banning user:', banError);
            }
          }
          
          // Create admin notification
          const notificationsFile = join(process.cwd(), 'admin-notifications.json');
          let notifications: any[] = [];
          if (existsSync(notificationsFile)) {
            try {
              const notificationsContent = readFileSync(notificationsFile, 'utf-8');
              notifications = JSON.parse(notificationsContent);
            } catch (error) {
              console.error('Error reading notifications file:', error);
            }
          }
          
          const notificationTitle = userStrikeCount >= 2 
            ? 'User Banned - Recipe Permanently Deleted'
            : 'Recipe Permanently Deleted';
            
          const notificationMessage = userStrikeCount >= 2
            ? `Recipe "${report.recipeTitle}" was permanently deleted. User received strike #${userStrikeCount} and has been automatically banned.`
            : `Recipe "${report.recipeTitle}" was permanently deleted due to inappropriate content. User received strike #${userStrikeCount}.`;
          
          const newNotification = {
            id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: userStrikeCount >= 2 ? 'USER_BANNED' : 'RECIPE_REMOVED',
            title: notificationTitle,
            message: notificationMessage,
            recipeId: report.recipeId,
            recipeTitle: report.recipeTitle,
            userId: recipeAuthorId,
            adminId: session.user.id,
            adminName: session.user.name || session.user.email,
            reason: 'Inappropriate content',
            read: false,
            createdAt: new Date().toISOString()
          };
          
          notifications.unshift(newNotification);
          
          try {
            writeFileSync(notificationsFile, JSON.stringify(notifications, null, 2));
            console.log(`Admin notification created for recipe removal: ${report.recipeTitle}`);
          } catch (error) {
            console.error('Error writing notifications file:', error);
          }
        } catch (error) {
          console.error('Error writing strikes file:', error);
        }
      }
    }
    
    // Write the updated reports back to the file
    writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
    
    return NextResponse.json({ 
      message: 'Report updated successfully',
      report 
    });

  } catch (error) {
    console.error('Error updating content report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 