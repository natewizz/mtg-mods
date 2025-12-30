import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const { userId } = await params;
    const body = await request.json();
    const { reason } = body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, bio: true }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if user is already banned (has [BANNED] in bio)
    if (user.bio && user.bio.includes('[BANNED]')) {
      return NextResponse.json({ message: 'User is already banned' }, { status: 400 });
    }

    // Ban the user by adding ban info to bio
    const banReason = reason || 'Multiple content violations';
    const newBio = user.bio 
      ? `${user.bio}\n\n[BANNED: ${banReason}]` 
      : `[BANNED: ${banReason}]`;

    await prisma.user.update({
      where: { id: userId },
      data: { bio: newBio }
    });

    // Invalidate cache to ensure fresh data using max profile
    revalidateTag('recipes', 'max');
    revalidateTag('filtered-recipes', 'max');
    revalidateTag('trending-recipes', 'max');
    revalidateTag('latest-recipes', 'max');

    console.log(`User ${user.username || user.email} (${userId}) has been banned by admin ${session.user.email}`);

    return NextResponse.json({ 
      message: 'User banned successfully',
      userId,
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.error('Error banning user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 