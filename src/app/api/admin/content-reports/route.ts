import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    // Read reports from JSON file
    const reportsFile = join(process.cwd(), 'content-reports.json');
    
    if (!existsSync(reportsFile)) {
      return NextResponse.json({ reports: [], total: 0 });
    }

    try {
      const fileContent = readFileSync(reportsFile, 'utf-8');
      const reports = JSON.parse(fileContent);
      
      // Filter to only show PENDING and REVIEWED reports
      const activeReports = reports.filter((report: any) => 
        ['PENDING', 'REVIEWED'].includes(report.status)
      );

      return NextResponse.json({ 
        reports: activeReports,
        total: activeReports.length
      });
    } catch (error) {
      console.error('Error reading reports file:', error);
      return NextResponse.json({ reports: [], total: 0 });
    }

  } catch (error) {
    console.error('Error fetching content reports:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 