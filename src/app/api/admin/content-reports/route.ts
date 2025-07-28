import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { readFileSync, existsSync } from 'fs';
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const reportsFile = join(process.cwd(), 'content-reports.json');
    if (!existsSync(reportsFile)) {
      return NextResponse.json({ reports: [] });
    }

    try {
      const fileContent = readFileSync(reportsFile, 'utf-8');
      const allReports: ContentReport[] = JSON.parse(fileContent);
      
      // Only return pending reports by default
      const pendingReports = allReports.filter(report => report.status === 'pending');
      
      return NextResponse.json({ reports: pendingReports });
    } catch (error) {
      console.error('Error reading reports file:', error);
      return NextResponse.json({ reports: [] });
    }
  } catch (error) {
    console.error('Error fetching content reports:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 