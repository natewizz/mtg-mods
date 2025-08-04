const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function awardBadge(userId, badgeName, awardedBy = null) {
  try {
    // Get the badge
    const badge = await prisma.$queryRaw`
      SELECT * FROM "Badge" WHERE "name" = ${badgeName}
    `;
    
    if (!badge || badge.length === 0) {
      console.error(`Badge not found: ${badgeName}`);
      return;
    }
    
    // Check if user already has this badge
    const existingBadge = await prisma.$queryRaw`
      SELECT * FROM "UserBadge" 
      WHERE "userId" = ${userId} AND "badgeId" = ${badge[0].id}
    `;
    
    if (existingBadge && existingBadge.length > 0) {
      return; // User already has this badge
    }
    
    // Award the badge
    await prisma.$executeRaw`
      INSERT INTO "UserBadge" ("id", "userId", "badgeId", "earnedAt", "awardedBy")
      VALUES (${crypto.randomUUID()}, ${userId}, ${badge[0].id}, NOW(), ${awardedBy})
    `;
    
    console.log(`🏆 Awarded badge "${badge[0].displayName}" to user ${userId}`);
  } catch (error) {
    console.error(`Error awarding badge ${badgeName} to user ${userId}:`, error);
  }
}

async function awardRetroactiveBadges() {
  console.log('🏆 Starting retroactive badge awarding...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Get all users with their recipes and existing badges
    const users = await prisma.$queryRaw`
      SELECT 
        u.id,
        u.name,
        u.username,
        u."createdAt",
        COUNT(DISTINCT r.id) as recipe_count,
        COUNT(DISTINCT v.id) as total_likes,
        COUNT(DISTINCT t.id) as total_tries,
        COUNT(DISTINCT b.id) as total_bookmarks
      FROM "User" u
      LEFT JOIN "Recipe" r ON u.id = r."authorId"
      LEFT JOIN "Vote" v ON r.id = v."recipeId" AND v.value = 1
      LEFT JOIN "Tried" t ON r.id = t."recipeId"
      LEFT JOIN "Bookmark" b ON r.id = b."recipeId"
      GROUP BY u.id, u.name, u.username, u."createdAt"
      ORDER BY u."createdAt"
    `;
    
    console.log(`Found ${users.length} users to process`);
    
    for (const user of users) {
      console.log(`\nProcessing user: ${user.name || user.username || user.id}`);
      
      // Get existing badges for this user
      const existingBadges = await prisma.$queryRaw`
        SELECT b."name" 
        FROM "UserBadge" ub
        JOIN "Badge" b ON ub."badgeId" = b.id
        WHERE ub."userId" = ${user.id}
      `;
      
      const existingBadgeNames = existingBadges.map(b => b.name);
      let awardedCount = 0;
      
      // Check recipe badges
      const recipeCount = parseInt(user.recipe_count);
      if (recipeCount >= 1 && !existingBadgeNames.includes('first-recipe')) {
        await awardBadge(user.id, 'first-recipe');
        awardedCount++;
        console.log(`  ✅ Awarded first-recipe badge`);
      }
      
      if (recipeCount >= 1 && !existingBadgeNames.includes('recipe-1')) {
        await awardBadge(user.id, 'recipe-1');
        awardedCount++;
        console.log(`  ✅ Awarded recipe-1 badge`);
      }
      
      if (recipeCount >= 5 && !existingBadgeNames.includes('recipe-5')) {
        await awardBadge(user.id, 'recipe-5');
        awardedCount++;
        console.log(`  ✅ Awarded recipe-5 badge`);
      }
      
      if (recipeCount >= 10 && !existingBadgeNames.includes('recipe-10')) {
        await awardBadge(user.id, 'recipe-10');
        awardedCount++;
        console.log(`  ✅ Awarded recipe-10 badge`);
      }
      
      // Check like badges
      const totalLikes = parseInt(user.total_likes);
      if (totalLikes >= 1 && !existingBadgeNames.includes('first-like')) {
        await awardBadge(user.id, 'first-like');
        awardedCount++;
        console.log(`  ✅ Awarded first-like badge`);
      }
      
      if (totalLikes >= 1 && !existingBadgeNames.includes('likes-1')) {
        await awardBadge(user.id, 'likes-1');
        awardedCount++;
        console.log(`  ✅ Awarded likes-1 badge`);
      }
      
      if (totalLikes >= 5 && !existingBadgeNames.includes('likes-5')) {
        await awardBadge(user.id, 'likes-5');
        awardedCount++;
        console.log(`  ✅ Awarded likes-5 badge`);
      }
      
      // Check tried badges
      const totalTries = parseInt(user.total_tries);
      if (totalTries >= 1 && !existingBadgeNames.includes('first-tried')) {
        await awardBadge(user.id, 'first-tried');
        awardedCount++;
        console.log(`  ✅ Awarded first-tried badge`);
      }
      
      if (totalTries >= 1 && !existingBadgeNames.includes('tried-1')) {
        await awardBadge(user.id, 'tried-1');
        awardedCount++;
        console.log(`  ✅ Awarded tried-1 badge`);
      }
      
      if (totalTries >= 5 && !existingBadgeNames.includes('tried-5')) {
        await awardBadge(user.id, 'tried-5');
        awardedCount++;
        console.log(`  ✅ Awarded tried-5 badge`);
      }
      
      // Check bookmark badges
      const totalBookmarks = parseInt(user.total_bookmarks);
      if (totalBookmarks >= 1 && !existingBadgeNames.includes('bookmarks-1')) {
        await awardBadge(user.id, 'bookmarks-1');
        awardedCount++;
        console.log(`  ✅ Awarded bookmarks-1 badge`);
      }
      
      // Check beta user badge (users who joined before 2025)
      const userCreatedAt = new Date(user.createdAt);
      const betaCutoff = new Date('2025-01-01');
      if (userCreatedAt < betaCutoff && !existingBadgeNames.includes('beta-user')) {
        await awardBadge(user.id, 'beta-user');
        awardedCount++;
        console.log(`  ✅ Awarded beta-user badge`);
      }
      
      if (awardedCount > 0) {
        console.log(`  🎉 Total badges awarded: ${awardedCount}`);
      } else {
        console.log(`  ℹ️  No new badges to award`);
      }
    }
    
    console.log('\n🎉 Retroactive badge awarding completed!');
  } catch (error) {
    console.error('❌ Error awarding retroactive badges:', error);
  } finally {
    await prisma.$disconnect();
  }
}

awardRetroactiveBadges(); 