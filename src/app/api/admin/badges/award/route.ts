import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { BadgeService } from '@/lib/badge-service';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { userId, badgeName } = await request.json();

    if (!userId || !badgeName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify badge exists and is manual
    const badge = await prisma.badge.findUnique({
      where: { name: badgeName }
    });

    if (!badge) {
      return NextResponse.json({ message: 'Badge not found' }, { status: 404 });
    }

    if (!badge.isManual) {
      return NextResponse.json({ message: 'This badge cannot be manually awarded' }, { status: 400 });
    }

    // Award the badge
    await BadgeService.awardBadge(userId, badgeName, session.user.id);

    return NextResponse.json({ 
      message: `Badge "${badge.displayName}" awarded to user successfully` 
    });

  } catch (error) {
    console.error('Error awarding badge:', error);
    return NextResponse.json(
      { message: 'Failed to award badge' },
      { status: 500 }
    );
  }
} 