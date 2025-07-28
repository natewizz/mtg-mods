import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { recipeId, recipeTitle, recipeSlug } = body;

    if (!recipeId || !recipeTitle || !recipeSlug) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Store reports in a JSON file (temporary solution until database migration)
    const reportsFile = join(process.cwd(), 'content-reports.json');
    
    // Read existing reports
    let reports = [];
    if (existsSync(reportsFile)) {
      try {
        const fileContent = readFileSync(reportsFile, 'utf-8');
        reports = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading reports file:', error);
        reports = [];
      }
    }

    // Check if user has already reported this recipe
    const existingReport = reports.find((report: any) => 
      report.recipeId === recipeId && 
      report.reporterId === session.user.id &&
      ['PENDING', 'REVIEWED'].includes(report.status)
    );

    if (existingReport) {
      return NextResponse.json({ message: 'You have already reported this content' }, { status: 400 });
    }

    // Get recipe author ID from database
    let recipeAuthorId = 'unknown';
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
        select: { authorId: true }
      });
      if (recipe) {
        recipeAuthorId = recipe.authorId;
      }
    } catch (error) {
      console.error('Error fetching recipe author:', error);
    }

    // Create new report
    const newReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recipeId,
      recipeTitle,
      recipeSlug,
      recipeAuthorId,
      reporterId: session.user.id,
      reporterName: session.user.name || session.user.email || 'Unknown',
      reporterEmail: session.user.email,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to reports array
    reports.unshift(newReport);

    // Write back to file
    try {
      writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
    } catch (error) {
      console.error('Error writing reports file:', error);
      return NextResponse.json({ message: 'Failed to save report' }, { status: 500 });
    }

    // Log the report for audit purposes
    console.log(`Content report stored: Recipe "${recipeTitle}" (${recipeId}) reported by ${session.user.email} at ${new Date().toISOString()}`);

    return NextResponse.json({ 
      message: 'Report submitted successfully',
      reportId: newReport.id
    });

  } catch (error) {
    console.error('Error processing content report:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 