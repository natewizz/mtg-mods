import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const strikesFile = join(process.cwd(), 'user-strikes.json');
    if (!existsSync(strikesFile)) {
      return NextResponse.json({ strikes: [], total: 0 });
    }

    try {
      const fileContent = readFileSync(strikesFile, 'utf-8');
      const strikes = JSON.parse(fileContent);
      
      // Group strikes by user
      const userStrikes: { [userId: string]: any[] } = {};
      strikes.forEach((strike: any) => {
        if (!userStrikes[strike.userId]) {
          userStrikes[strike.userId] = [];
        }
        userStrikes[strike.userId].push(strike);
      });

      // Get usernames for all users with strikes
      const userIds = Object.keys(userStrikes);
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, username: true, name: true, email: true }
      });

      const userMap = users.reduce((acc: { [key: string]: any }, user: any) => {
        acc[user.id] = user;
        return acc;
      }, {} as { [key: string]: any });

      // Calculate strike counts and account status
      const userSummary = Object.entries(userStrikes).map(([userId, userStrikesList]) => {
        const user = userMap[userId];
        return {
          userId,
          username: user?.username || user?.name || user?.email || 'Unknown User',
          strikeCount: userStrikesList.length,
          isDisabled: userStrikesList.length >= 2,
          strikes: userStrikesList,
          lastStrike: userStrikesList[userStrikesList.length - 1]?.createdAt
        };
      });

      return NextResponse.json({ 
        strikes: userSummary, 
        total: strikes.length,
        usersWithStrikes: userSummary.length
      });
    } catch (error) {
      console.error('Error reading strikes file:', error);
      return NextResponse.json({ strikes: [], total: 0 });
    }
  } catch (error) {
    console.error('Error fetching user strikes:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 