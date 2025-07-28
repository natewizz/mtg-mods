import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ContentReport {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  userId: string;
  userEmail: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { recipeId, recipeTitle, recipeSlug } = await request.json();

    if (!recipeId || !recipeTitle || !recipeSlug) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const reportsFile = join(process.cwd(), 'content-reports.json');
    let reports: ContentReport[] = [];
    
    if (existsSync(reportsFile)) {
      try {
        const fileContent = readFileSync(reportsFile, 'utf-8');
        reports = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading reports file:', error);
      }
    }

    const newReport: ContentReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recipeId,
      recipeTitle,
      recipeSlug,
      userId: session.user.id,
      userEmail: session.user.email || 'unknown',
      reason: 'Inappropriate content',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    reports.unshift(newReport);
    
    try {
      writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
      console.log(`Content report created for recipe: ${recipeTitle}`);
    } catch (error) {
      console.error('Error writing reports file:', error);
      return NextResponse.json({ message: 'Failed to save report' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Content reported successfully',
      report: newReport
    });

  } catch (error) {
    console.error('Error creating content report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 