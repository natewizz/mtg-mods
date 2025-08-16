const { PrismaClient } = require('@prisma/client');

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
  console.log('🌱 Seeding badges (simple version)...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    for (const badge of badges) {
      console.log(`Processing badge: ${badge.displayName}`);
      
      // Use raw SQL to avoid enum issues
      await prisma.$executeRaw`
        INSERT INTO "Badge" ("id", "name", "displayName", "description", "icon", "color", "category", "triggerType", "triggerValue", "isManual", "isActive", "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${badge.name}, ${badge.displayName}, ${badge.description}, ${badge.icon}, ${badge.color}, ${badge.category}, ${badge.triggerType}, ${badge.triggerValue}, ${badge.isManual}, ${badge.isActive}, NOW(), NOW())
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
  } finally {
    await prisma.$disconnect();
  }
}

seedBadges(); 