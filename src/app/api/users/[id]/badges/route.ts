import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { BadgeService } from '@/lib/badge-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get user badges
    const userBadges = await BadgeService.getUserBadges(id);
    
    return NextResponse.json(userBadges);
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user badges' },
      { status: 500 }
    );
  }
} 