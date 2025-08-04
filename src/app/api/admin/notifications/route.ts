import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    // Get only unread notifications from database
    const notifications = await prisma.adminNotification.findMany({
      where: {
        adminId: session.user.id,
        read: false // Only get unread notifications
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match the expected format
    const formattedNotifications = notifications.map(notification => ({
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      recipeId: notification.recipeId,
      recipeTitle: notification.recipeTitle,
      userId: notification.userId,
      adminId: notification.adminId,
      reason: notification.reason,
      read: notification.read,
      createdAt: notification.createdAt.toISOString(),
      readAt: notification.readAt?.toISOString()
    }));
    
    return NextResponse.json({ notifications: formattedNotifications });
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { notificationId, read } = await request.json();

    if (!notificationId) {
      return NextResponse.json({ message: 'Notification ID required' }, { status: 400 });
    }

    // Update notification read status
    const updatedNotification = await prisma.adminNotification.update({
      where: {
        id: notificationId,
        adminId: session.user.id // Ensure admin can only update their own notifications
      },
      data: {
        read: read,
        readAt: read ? new Date() : null
      }
    });

    return NextResponse.json({ 
      message: 'Notification updated successfully',
      notification: {
        id: updatedNotification.id,
        read: updatedNotification.read,
        readAt: updatedNotification.readAt?.toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating admin notification:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 