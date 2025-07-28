import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const strikesFile = join(process.cwd(), 'user-strikes.json');
    if (!existsSync(strikesFile)) {
      return NextResponse.json({ strikes: [], strikeCount: 0 });
    }

    try {
      const fileContent = readFileSync(strikesFile, 'utf-8');
      const strikes = JSON.parse(fileContent);
      
      // Filter strikes for the current user only
      const userStrikes = strikes.filter((strike: any) => strike.userId === session.user.id);
      
      return NextResponse.json({ 
        strikes: userStrikes,
        strikeCount: userStrikes.length
      });
    } catch (error) {
      console.error('Error reading strikes file:', error);
      return NextResponse.json({ strikes: [], strikeCount: 0 });
    }
  } catch (error) {
    console.error('Error fetching user strikes:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 