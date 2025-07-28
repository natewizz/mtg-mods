import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipeId?: string;
  recipeTitle?: string;
  userId?: string;
  adminId: string;
  adminName: string;
  reason?: string;
  read: boolean;
  createdAt: string;
  readAt?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const notificationsFile = join(process.cwd(), 'admin-notifications.json');
    if (!existsSync(notificationsFile)) {
      return NextResponse.json({ notifications: [] });
    }

    try {
      const fileContent = readFileSync(notificationsFile, 'utf-8');
      const notifications: AdminNotification[] = JSON.parse(fileContent);
      
      return NextResponse.json({ notifications });
    } catch (error) {
      console.error('Error reading notifications file:', error);
      return NextResponse.json({ notifications: [] });
    }
  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { notificationId } = await request.json();

    const notificationsFile = join(process.cwd(), 'admin-notifications.json');
    if (!existsSync(notificationsFile)) {
      return NextResponse.json({ message: 'No notifications found' }, { status: 404 });
    }

    const fileContent = readFileSync(notificationsFile, 'utf-8');
    const notifications: AdminNotification[] = JSON.parse(fileContent);
    
    const notification = notifications.find((n: AdminNotification) => n.id === notificationId);
    if (!notification) {
      return NextResponse.json({ message: 'Notification not found' }, { status: 404 });
    }

    notification.read = true;
    notification.readAt = new Date().toISOString();
    
    writeFileSync(notificationsFile, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json({ 
      message: 'Notification marked as read',
      notification 
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 