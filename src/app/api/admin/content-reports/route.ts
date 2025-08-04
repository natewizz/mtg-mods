import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    // Get pending reports from database
    const pendingReports = await prisma.contentReport.findMany({
      where: {
        status: 'PENDING'
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        recipe: {
          select: {
            id: true,
            title: true,
            slug: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match the expected format
    const reports = pendingReports.map(report => ({
      id: report.id,
      recipeId: report.recipeId,
      recipeTitle: report.recipeTitle,
      recipeSlug: report.recipeSlug,
      userId: report.reporterId,
      userEmail: report.reporter.email || 'unknown',
      reason: 'Inappropriate content',
      status: report.status.toLowerCase(),
      createdAt: report.createdAt.toISOString(),
      reporter: report.reporter,
      recipe: report.recipe
    }));
    
    return NextResponse.json({ reports });
  } catch (error) {
    console.error('Error fetching content reports:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 