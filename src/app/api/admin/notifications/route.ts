import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const notificationsFile = join(process.cwd(), 'admin-notifications.json');
    if (!existsSync(notificationsFile)) {
      return NextResponse.json({ notifications: [], total: 0 });
    }

    try {
      const fileContent = readFileSync(notificationsFile, 'utf-8');
      const notifications = JSON.parse(fileContent);
      
      // Only return unread notifications
      const unreadNotifications = notifications.filter((notification: any) => !notification.read);
      
      return NextResponse.json({ 
        notifications: unreadNotifications, 
        total: unreadNotifications.length 
      });
    } catch (error) {
      console.error('Error reading notifications file:', error);
      return NextResponse.json({ notifications: [], total: 0 });
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { notificationId, action } = body; // action: 'mark_read'

    const notificationsFile = join(process.cwd(), 'admin-notifications.json');
    if (!existsSync(notificationsFile)) {
      return NextResponse.json({ message: 'No notifications found' }, { status: 404 });
    }

    const fileContent = readFileSync(notificationsFile, 'utf-8');
    const notifications = JSON.parse(fileContent);

    const notificationIndex = notifications.findIndex((notification: any) => notification.id === notificationId);
    if (notificationIndex === -1) {
      return NextResponse.json({ message: 'Notification not found' }, { status: 404 });
    }

    if (action === 'mark_read') {
      notifications[notificationIndex].read = true;
      notifications[notificationIndex].readAt = new Date().toISOString();
    }

    try {
      writeFileSync(notificationsFile, JSON.stringify(notifications, null, 2));
    } catch (error) {
      console.error('Error writing notifications file:', error);
      return NextResponse.json({ message: 'Failed to update notification' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Notification updated successfully',
      action,
      notificationId 
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 