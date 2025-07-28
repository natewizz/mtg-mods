import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { action, reason } = body; // action: 'dismiss', 'remove_recipe'
    const { reportId } = params;

    const reportsFile = join(process.cwd(), 'content-reports.json');
    if (!existsSync(reportsFile)) {
      return NextResponse.json({ message: 'No reports found' }, { status: 404 });
    }

    const fileContent = readFileSync(reportsFile, 'utf-8');
    const reports = JSON.parse(fileContent);

    const reportIndex = reports.findIndex((report: any) => report.id === reportId);
    if (reportIndex === -1) {
      return NextResponse.json({ message: 'Report not found' }, { status: 404 });
    }

    const report = reports[reportIndex];

    if (action === 'dismiss') {
      // Mark as dismissed - no further action needed
      reports[reportIndex].status = 'DISMISSED';
      reports[reportIndex].adminNotes = reason || 'Dismissed by admin';
      reports[reportIndex].resolvedAt = new Date().toISOString();
      reports[reportIndex].resolvedBy = session.user.id;
      
      console.log(`Content report dismissed: ${report.recipeTitle} (${reportId}) by ${session.user.email}`);
    } 
    else if (action === 'remove_recipe') {
      // Mark as resolved and add strike to user
      reports[reportIndex].status = 'RESOLVED';
      reports[reportIndex].adminNotes = reason || 'Recipe permanently deleted due to inappropriate content';
      reports[reportIndex].resolvedAt = new Date().toISOString();
      reports[reportIndex].resolvedBy = session.user.id;
      reports[reportIndex].action = 'RECIPE_REMOVED';

      // Permanently delete the recipe from the database
      try {
        await prisma.recipe.delete({
          where: { id: report.recipeId }
        });
        console.log(`Recipe "${report.recipeTitle}" (${report.recipeId}) permanently deleted from database`);
      } catch (deleteError) {
        console.error('Error deleting recipe from database:', deleteError);
        // Continue with strike process even if deletion fails
      }

      // Add strike to user (stored in separate file for now)
      const strikesFile = join(process.cwd(), 'user-strikes.json');
      let strikes = [];
      if (existsSync(strikesFile)) {
        try {
          const strikesContent = readFileSync(strikesFile, 'utf-8');
          strikes = JSON.parse(strikesContent);
        } catch (error) {
          console.error('Error reading strikes file:', error);
        }
      }

      // Find the recipe author
      const recipeAuthorId = report.recipeAuthorId || 'unknown';
      
      const newStrike = {
        id: `strike_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: recipeAuthorId,
        reason: reason || 'Inappropriate content - recipe permanently deleted',
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
        const userStrikeCount = strikes.filter((strike: any) => strike.userId === recipeAuthorId).length;
        
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
        let notifications = [];
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
          reason: reason || 'Inappropriate content',
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

    // Save updated reports
    try {
      writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
    } catch (error) {
      console.error('Error writing reports file:', error);
      return NextResponse.json({ message: 'Failed to update report' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Report updated successfully',
      action,
      reportId 
    });

  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 