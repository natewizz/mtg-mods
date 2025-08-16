const { PrismaClient } = require('@prisma/client');

// Create Prisma client with better error handling
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const badges = [
  // Role Badges
  {
    name: 'user',
    displayName: 'User',
    description: 'A member of the Cantripped community',
    icon: '👤',
    color: 'bg-gray-500',
    category: 'ROLE',
    triggerType: 'MANUAL',
    isManual: false,
  },
  {
    name: 'moderator',
    displayName: 'Moderator',
    description: 'A community moderator who helps maintain order',
    icon: '🛡️',
    color: 'bg-blue-500',
    category: 'ROLE',
    triggerType: 'MANUAL',
    isManual: true,
  },
  {
    name: 'admin',
    displayName: 'Admin',
    description: 'Platform administrator with full privileges',
    icon: '👑',
    color: 'bg-purple-500',
    category: 'ROLE',
    triggerType: 'MANUAL',
    isManual: true,
  },

  // Achievement Badges
  {
    name: 'first-recipe',
    displayName: 'First Recipe',
    description: 'Posted your first recipe to the community',
    icon: '🎯',
    color: 'bg-green-500',
    category: 'ACHIEVEMENT',
    triggerType: 'FIRST_RECIPE',
    isManual: false,
  },
  {
    name: 'first-like',
    displayName: 'First Like',
    description: 'Received your first like on a recipe',
    icon: '❤️',
    color: 'bg-red-500',
    category: 'ACHIEVEMENT',
    triggerType: 'FIRST_LIKE',
    isManual: false,
  },
  {
    name: 'first-tried',
    displayName: 'First Tried',
    description: 'Someone tried your recipe for the first time',
    icon: '✅',
    color: 'bg-emerald-500',
    category: 'ACHIEVEMENT',
    triggerType: 'FIRST_TRIED',
    isManual: false,
  },

  // Recipe Milestone Badges
  {
    name: 'recipe-1',
    displayName: 'Recipe Creator',
    description: 'Created 1 recipe',
    icon: '📝',
    color: 'bg-blue-400',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 1,
    isManual: false,
  },
  {
    name: 'recipe-5',
    displayName: 'Recipe Enthusiast',
    description: 'Created 5 recipes',
    icon: '📚',
    color: 'bg-blue-500',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 5,
    isManual: false,
  },
  {
    name: 'recipe-10',
    displayName: 'Recipe Master',
    description: 'Created 10 recipes',
    icon: '📖',
    color: 'bg-blue-600',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 10,
    isManual: false,
  },
  {
    name: 'recipe-25',
    displayName: 'Recipe Expert',
    description: 'Created 25 recipes',
    icon: '📚',
    color: 'bg-blue-700',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 25,
    isManual: false,
  },
  {
    name: 'recipe-50',
    displayName: 'Recipe Legend',
    description: 'Created 50 recipes',
    icon: '🏆',
    color: 'bg-blue-800',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 50,
    isManual: false,
  },
  {
    name: 'recipe-100',
    displayName: 'Recipe Grandmaster',
    description: 'Created 100 recipes',
    icon: '👑',
    color: 'bg-blue-900',
    category: 'MILESTONE',
    triggerType: 'RECIPE_COUNT',
    triggerValue: 100,
    isManual: false,
  },

  // Like Milestone Badges
  {
    name: 'likes-1',
    displayName: 'Liked',
    description: 'Received 1 like',
    icon: '❤️',
    color: 'bg-red-400',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 1,
    isManual: false,
  },
  {
    name: 'likes-5',
    displayName: 'Popular',
    description: 'Received 5 likes',
    icon: '💖',
    color: 'bg-red-500',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 5,
    isManual: false,
  },
  {
    name: 'likes-10',
    displayName: 'Trending',
    description: 'Received 10 likes',
    icon: '🔥',
    color: 'bg-red-600',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 10,
    isManual: false,
  },
  {
    name: 'likes-25',
    displayName: 'Viral',
    description: 'Received 25 likes',
    icon: '🚀',
    color: 'bg-red-700',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 25,
    isManual: false,
  },
  {
    name: 'likes-50',
    displayName: 'Internet Famous',
    description: 'Received 50 likes',
    icon: '⭐',
    color: 'bg-red-800',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 50,
    isManual: false,
  },
  {
    name: 'likes-100',
    displayName: 'Celebrity Chef',
    description: 'Received 100 likes',
    icon: '🌟',
    color: 'bg-red-900',
    category: 'MILESTONE',
    triggerType: 'LIKE_COUNT',
    triggerValue: 100,
    isManual: false,
  },

  // Tried Milestone Badges
  {
    name: 'tried-1',
    displayName: 'Tried',
    description: 'Someone tried your recipe',
    icon: '✅',
    color: 'bg-emerald-400',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 1,
    isManual: false,
  },
  {
    name: 'tried-5',
    displayName: 'Tested',
    description: '5 people tried your recipes',
    icon: '🧪',
    color: 'bg-emerald-500',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 5,
    isManual: false,
  },
  {
    name: 'tried-10',
    displayName: 'Proven',
    description: '10 people tried your recipes',
    icon: '🔬',
    color: 'bg-emerald-600',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 10,
    isManual: false,
  },
  {
    name: 'tried-25',
    displayName: 'Trusted',
    description: '25 people tried your recipes',
    icon: '🏅',
    color: 'bg-emerald-700',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 25,
    isManual: false,
  },
  {
    name: 'tried-50',
    displayName: 'Reliable',
    description: '50 people tried your recipes',
    icon: '💎',
    color: 'bg-emerald-800',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 50,
    isManual: false,
  },
  {
    name: 'tried-100',
    displayName: 'Legendary',
    description: '100 people tried your recipes',
    icon: '👑',
    color: 'bg-emerald-900',
    category: 'MILESTONE',
    triggerType: 'TRIED_COUNT',
    triggerValue: 100,
    isManual: false,
  },

  // Bookmark Milestone Badges
  {
    name: 'bookmarks-1',
    displayName: 'Bookmarked',
    description: 'Someone bookmarked your recipe',
    icon: '🔖',
    color: 'bg-yellow-400',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 1,
    isManual: false,
  },
  {
    name: 'bookmarks-5',
    displayName: 'Saved',
    description: '5 people bookmarked your recipes',
    icon: '📌',
    color: 'bg-yellow-500',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 5,
    isManual: false,
  },
  {
    name: 'bookmarks-10',
    displayName: 'Favorited',
    description: '10 people bookmarked your recipes',
    icon: '⭐',
    color: 'bg-yellow-600',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 10,
    isManual: false,
  },
  {
    name: 'bookmarks-25',
    displayName: 'Essential',
    description: '25 people bookmarked your recipes',
    icon: '💫',
    color: 'bg-yellow-700',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 25,
    isManual: false,
  },
  {
    name: 'bookmarks-50',
    displayName: 'Must-Have',
    description: '50 people bookmarked your recipes',
    icon: '🌟',
    color: 'bg-yellow-800',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 50,
    isManual: false,
  },
  {
    name: 'bookmarks-100',
    displayName: 'Iconic',
    description: '100 people bookmarked your recipes',
    icon: '🏆',
    color: 'bg-yellow-900',
    category: 'MILESTONE',
    triggerType: 'BOOKMARK_COUNT',
    triggerValue: 100,
    isManual: false,
  },

  // Special Badges
  {
    name: 'founding-member',
    displayName: 'Founding Member',
    description: 'One of the original members who helped build the community',
    icon: '🌟',
    color: 'bg-purple-600',
    category: 'SPECIAL',
    triggerType: 'MANUAL',
    isManual: true,
  },
  {
    name: 'community-champion',
    displayName: 'Community Champion',
    description: 'Exceptional contributions to the community',
    icon: '🏆',
    color: 'bg-purple-700',
    category: 'SPECIAL',
    triggerType: 'MANUAL',
    isManual: true,
  },
  {
    name: 'creative-chef',
    displayName: 'Creative Chef',
    description: 'For unique and creative recipe contributions',
    icon: '🎨',
    color: 'bg-purple-500',
    category: 'SPECIAL',
    triggerType: 'MANUAL',
    isManual: true,
  },
  {
    name: 'helpful-helper',
    displayName: 'Helpful Helper',
    description: 'For helping other users and contributing to community growth',
    icon: '🤝',
    color: 'bg-purple-400',
    category: 'SPECIAL',
    triggerType: 'MANUAL',
    isManual: true,
  },

  // Beta User Badge
  {
    name: 'beta-user',
    displayName: 'Beta Tester',
    description: 'Early adopter who helped test the platform during beta',
    icon: '⚡',
    color: 'bg-orange-500',
    category: 'SPECIAL',
    triggerType: 'BETA_USER',
    isManual: false,
  },
];

async function seedBadges() {
  console.log('🌱 Seeding badges...');
  
  try {
    // Test database connection first
    console.log('🔍 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Verify prisma object
    if (!prisma || !prisma.badge) {
      throw new Error('Prisma client not properly initialized');
    }
    
    console.log('📝 Starting badge seeding...');
    for (const badge of badges) {
      console.log(`Processing badge: ${badge.displayName}`);
      
      // Use raw SQL to avoid enum issues
      await prisma.$executeRaw`
        INSERT INTO "Badge" ("id", "name", "displayName", "description", "icon", "color", "category", "triggerType", "triggerValue", "isManual", "isActive", "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${badge.name}, ${badge.displayName}, ${badge.description}, ${badge.icon}, ${badge.color}, ${badge.category}, ${badge.triggerType}, ${badge.triggerValue || null}, ${badge.isManual}, ${badge.isActive !== undefined ? badge.isActive : true}, NOW(), NOW())
        ON CONFLICT ("name") DO UPDATE SET
          "displayName" = EXCLUDED."displayName",
          "description" = EXCLUDED."description",
          "icon" = EXCLUDED."icon",
          "color" = EXCLUDED."color",
          "category" = EXCLUDED."category",
          "triggerType" = EXCLUDED."triggerType",
          "triggerValue" = EXCLUDED."triggerValue",
          "isManual" = EXCLUDED."isManual",
          "isActive" = EXCLUDED."isActive",
          "updatedAt" = NOW()
      `;
      
      console.log(`✅ Created/Updated badge: ${badge.displayName}`);
    }
    
    console.log('🎉 All badges seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding badges:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      prismaExists: !!prisma,
      badgeExists: !!(prisma && prisma.badge)
    });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

seedBadges(); 