import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/policies/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/community`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
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
    const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => {
      // Calculate priority based on engagement (votes, tries, bookmarks)
      const totalEngagement = (recipe._count?.votes || 0) + (recipe._count?.tried || 0) + (recipe._count?.bookmarks || 0)
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

    // Fetch all users with usernames for profile pages
    const users = await prisma.user.findMany({
      where: {
        username: {
          not: null,
        },
      },
      select: {
        username: true,
        updatedAt: true,
        _count: {
          select: {
            recipes: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Convert users to profile page sitemap entries
    const profilePages: MetadataRoute.Sitemap = users.map((user) => {
      // Calculate priority based on recipe count
      let priority = 0.4 // Base priority for profiles
      
      if (user._count?.recipes > 10) {
        priority = 0.7 // Active creators
      } else if (user._count?.recipes > 3) {
        priority = 0.6 // Regular contributors
      } else if (user._count?.recipes > 0) {
        priority = 0.5 // Occasional contributors
      }

      return {
        url: `${baseUrl}/profile/${user.username}`,
        lastModified: user.updatedAt,
        changeFrequency: 'weekly' as const,
        priority,
      }
    })

    return [...staticPages, ...recipePages, ...profilePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static pages if database fails
    return staticPages
  }
} 