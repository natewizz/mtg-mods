const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Define progressive badge groups where higher badges replace lower ones
const PROGRESSIVE_BADGE_GROUPS = {
  'recipe': ['recipe-1', 'recipe-5', 'recipe-10', 'recipe-25', 'recipe-50', 'recipe-100'],
  'likes': ['likes-1', 'likes-5', 'likes-10', 'likes-25', 'likes-50', 'likes-100'],
  'tried': ['tried-1', 'tried-5', 'tried-10', 'tried-25', 'tried-50', 'tried-100'],
  'bookmarks': ['bookmarks-1', 'bookmarks-5', 'bookmarks-10', 'bookmarks-25', 'bookmarks-50', 'bookmarks-100']
};

async function updateProgressiveBadges() {
  console.log('🔄 Starting progressive badge update...');

  try {
    // Get all users with their badges
    const users = await prisma.user.findMany({
      include: {
        userBadges: {
          include: {
            badge: true
          }
        }
      }
    });

    console.log(`📊 Found ${users.length} users to process`);

    let totalRemoved = 0;
    let totalUpdated = 0;

    for (const user of users) {
      console.log(`\n👤 Processing user: ${user.name || user.username || user.id}`);
      
      const userBadgeNames = user.userBadges.map(ub => ub.badge.name);
      let userRemoved = 0;

      // Process each progressive group
      for (const [groupKey, badgeGroup] of Object.entries(PROGRESSIVE_BADGE_GROUPS)) {
        let highestBadgeIndex = -1;
        let highestBadgeName = '';

        // Find the highest badge in this group that the user has
        for (let i = badgeGroup.length - 1; i >= 0; i--) {
          if (userBadgeNames.includes(badgeGroup[i])) {
            highestBadgeIndex = i;
            highestBadgeName = badgeGroup[i];
            break;
          }
        }

        // Remove all lower badges in this group
        if (highestBadgeIndex > 0) {
          const lowerBadges = badgeGroup.slice(0, highestBadgeIndex);
          
          for (const lowerBadgeName of lowerBadges) {
            const lowerUserBadge = user.userBadges.find(ub => ub.badge.name === lowerBadgeName);
            
            if (lowerUserBadge) {
              await prisma.userBadge.delete({
                where: { id: lowerUserBadge.id }
              });
              
              console.log(`  🗑️ Removed: ${lowerBadgeName} (keeping ${highestBadgeName})`);
              userRemoved++;
              totalRemoved++;
            }
          }
        }
      }

      if (userRemoved > 0) {
        totalUpdated++;
        console.log(`  ✅ Updated user: removed ${userRemoved} lower badges`);
      } else {
        console.log(`  ℹ️ No changes needed`);
      }
    }

    console.log(`\n🎉 Progressive badge update completed!`);
    console.log(`📈 Summary:`);
    console.log(`  - Users processed: ${users.length}`);
    console.log(`  - Users updated: ${totalUpdated}`);
    console.log(`  - Total badges removed: ${totalRemoved}`);

  } catch (error) {
    console.error('❌ Error updating progressive badges:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateProgressiveBadges()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 