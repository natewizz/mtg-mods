import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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

interface UserStrikeSummary {
  userId: string;
  username: string;
  strikeCount: number;
  isDisabled: boolean;
  strikes: UserStrike[];
  lastStrike?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const strikesFile = join(process.cwd(), 'user-strikes.json');
    if (!existsSync(strikesFile)) {
      return NextResponse.json({ strikes: [] });
    }

    try {
      const fileContent = readFileSync(strikesFile, 'utf-8');
      const strikes: UserStrike[] = JSON.parse(fileContent);
      
      // Group strikes by user
      const userStrikesMap = new Map<string, UserStrike[]>();
      
      strikes.forEach((strike: UserStrike) => {
        if (!userStrikesMap.has(strike.userId)) {
          userStrikesMap.set(strike.userId, []);
        }
        userStrikesMap.get(strike.userId)!.push(strike);
      });
      
      // Get user data for all users with strikes
      const userIds = Array.from(userStrikesMap.keys());
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, username: true, name: true, email: true, bio: true }
      });
      
      // Create a map for quick user lookup
      const userMap = new Map(users.map(user => [user.id, user]));
      
      // Convert to summary format
      const userStrikes: UserStrikeSummary[] = [];
      
      for (const [userId, userStrikesList] of userStrikesMap) {
        const strikeCount = userStrikesList.length;
        const lastStrike = userStrikesList.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]?.createdAt;
        
        // Get user data
        const user = userMap.get(userId);
        const username = user?.username || user?.name || user?.email || `User ${userId.slice(0, 8)}`;
        
        // Check if user is disabled by looking for [BANNED] in bio
        const isDisabled = user?.bio?.includes('[BANNED]') || strikeCount >= 2;
        
        userStrikes.push({
          userId,
          username,
          strikeCount,
          isDisabled,
          strikes: userStrikesList,
          lastStrike
        });
      }
      
      // Sort by strike count (highest first)
      userStrikes.sort((a, b) => b.strikeCount - a.strikeCount);
      
      return NextResponse.json({ strikes: userStrikes });
    } catch (error) {
      console.error('Error reading strikes file:', error);
      return NextResponse.json({ strikes: [] });
    }
  } catch (error) {
    console.error('Error fetching user strikes:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 