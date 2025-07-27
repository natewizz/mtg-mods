import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mtgmods.xyz'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/policies/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/community`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
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
      lastModified: recipe.updatedAt,
      changeFrequency: 'weekly' as const,
      priority,
    }
  })

  return [...staticPages, ...recipePages]
} 