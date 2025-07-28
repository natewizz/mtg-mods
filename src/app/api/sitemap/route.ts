import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('Sitemap API route called')
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mtgmods.xyz'
    
    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/recipes`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/learn`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/policies/terms`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/policies/privacy`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/policies/community`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]

    // Fetch all recipes from database
    const recipes = await prisma.recipe.findMany({
      select: {
        slug: true,
        updatedAt: true,
        _count: {
          select: {
            votes: true,
            tried: true,
            bookmarks: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Convert recipes to sitemap entries
    const recipePages = recipes.map((recipe) => {
      // Calculate priority based on engagement (votes, tries, bookmarks)
      const totalEngagement = recipe._count.votes + recipe._count.tried + recipe._count.bookmarks
      let priority = 0.6 // Base priority for recipes
      
      if (totalEngagement > 50) {
        priority = 0.9 // High engagement
      } else if (totalEngagement > 20) {
        priority = 0.8 // Medium engagement
      } else if (totalEngagement > 5) {
        priority = 0.7 // Low engagement
      }

      return {
        url: `${baseUrl}/recipes/${recipe.slug}`,
        lastModified: recipe.updatedAt.toISOString(),
        changeFrequency: 'weekly',
        priority,
      }
    })

    const allPages = [...staticPages, ...recipePages]

    // Generate XML manually to ensure proper formatting
    const timestamp = new Date().toISOString()
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at ${timestamp} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to basic sitemap if database fails
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mtgmods.xyz'
    const timestamp = new Date().toISOString()
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at ${timestamp} (fallback) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/recipes</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return new NextResponse(fallbackXml, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  }
} 