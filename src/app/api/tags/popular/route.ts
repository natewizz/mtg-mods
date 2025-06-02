import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/tags/popular
 * Returns tags that are used in at least 2 recipes
 */
export async function GET() {
  try {
    // Get tag usage counts
    const tagCounts = await prisma.$queryRaw`
      SELECT t.name, COUNT(rt.recipeId) as count
      FROM Tag t
      JOIN RecipeTag rt ON t.id = rt.tagId
      GROUP BY t.name
      HAVING count >= 2
      ORDER BY count DESC
      LIMIT 30
    `;
    
    // Extract just the tag names
    const tags = Array.isArray(tagCounts) 
      ? tagCounts.map((tag: any) => tag.name)
      : [];
    
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    return NextResponse.json({ error: 'Failed to fetch popular tags' }, { status: 500 });
  }
} 