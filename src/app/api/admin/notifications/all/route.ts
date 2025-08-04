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

    // Get all notifications from database (both read and unread)
    const notifications = await prisma.adminNotification.findMany({
      where: {
        adminId: session.user.id
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
    console.error('Error fetching all admin notifications:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 