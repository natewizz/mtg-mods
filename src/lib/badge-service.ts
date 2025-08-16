import { prisma } from './prisma';
import { BadgeCategory } from '@prisma/client';

export interface BadgeAward {
  userId: string;
  badgeName: string;
  reason?: string;
}

// Define progressive badge groups where higher badges replace lower ones
const PROGRESSIVE_BADGE_GROUPS = {
  'recipe': ['recipe-1', 'recipe-5', 'recipe-10', 'recipe-25', 'recipe-50', 'recipe-100'],
  'likes': ['likes-1', 'likes-5', 'likes-10', 'likes-25', 'likes-50', 'likes-100'],
  'tried': ['tried-1', 'tried-5', 'tried-10', 'tried-25', 'tried-50', 'tried-100'],
  'bookmarks': ['bookmarks-1', 'bookmarks-5', 'bookmarks-10', 'bookmarks-25', 'bookmarks-50', 'bookmarks-100']
};

export class BadgeService {
  /**
   * Check and award badges for recipe creation with progressive replacement
   */
  static async checkRecipeBadges(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        recipes: true,
        userBadges: {
          include: { badge: true }
        }
      }
    });

    if (!user) return;

    const recipeCount = user.recipes.length;
    const existingBadgeNames = user.userBadges.map(ub => ub.badge.name);

    // Check first recipe badge (non-progressive)
    if (recipeCount === 1 && !existingBadgeNames.includes('first-recipe')) {
      await this.awardBadge(userId, 'first-recipe');
    }

    // Check progressive recipe milestone badges
    const milestones = [1, 5, 10, 25, 50, 100];
    let highestMilestone = 0;
    
    for (const milestone of milestones) {
      if (recipeCount >= milestone) {
        highestMilestone = milestone;
      }
    }

    if (highestMilestone > 0) {
      const targetBadgeName = `recipe-${highestMilestone}`;
      
      // Remove lower milestone badges and award the highest one
      await this.handleProgressiveBadge(userId, 'recipe', targetBadgeName, existingBadgeNames);
    }
  }

  /**
   * Check and award badges for likes received with progressive replacement
   */
  static async checkLikeBadges(userId: string) {
    const totalLikes = await prisma.vote.count({
      where: {
        recipe: { authorId: userId },
        value: 1
      }
    });

    const existingBadgeNames = await this.getUserBadgeNames(userId);

    // Check first like badge (non-progressive)
    if (totalLikes === 1 && !existingBadgeNames.includes('first-like')) {
      await this.awardBadge(userId, 'first-like');
    }

    // Check progressive like milestone badges
    const milestones = [1, 5, 10, 25, 50, 100];
    let highestMilestone = 0;
    
    for (const milestone of milestones) {
      if (totalLikes >= milestone) {
        highestMilestone = milestone;
      }
    }

    if (highestMilestone > 0) {
      const targetBadgeName = `likes-${highestMilestone}`;
      
      // Remove lower milestone badges and award the highest one
      await this.handleProgressiveBadge(userId, 'likes', targetBadgeName, existingBadgeNames);
    }
  }

  /**
   * Check and award badges for tries received with progressive replacement
   */
  static async checkTriedBadges(userId: string) {
    const totalTries = await prisma.tried.count({
      where: {
        recipe: { authorId: userId }
      }
    });

    const existingBadgeNames = await this.getUserBadgeNames(userId);

    // Check first tried badge (non-progressive)
    if (totalTries === 1 && !existingBadgeNames.includes('first-tried')) {
      await this.awardBadge(userId, 'first-tried');
    }

    // Check progressive tried milestone badges
    const milestones = [1, 5, 10, 25, 50, 100];
    let highestMilestone = 0;
    
    for (const milestone of milestones) {
      if (totalTries >= milestone) {
        highestMilestone = milestone;
      }
    }

    if (highestMilestone > 0) {
      const targetBadgeName = `tried-${highestMilestone}`;
      
      // Remove lower milestone badges and award the highest one
      await this.handleProgressiveBadge(userId, 'tried', targetBadgeName, existingBadgeNames);
    }
  }

  /**
   * Check and award badges for bookmarks received with progressive replacement
   */
  static async checkBookmarkBadges(userId: string) {
    const totalBookmarks = await prisma.bookmark.count({
      where: {
        recipe: { authorId: userId }
      }
    });

    const existingBadgeNames = await this.getUserBadgeNames(userId);

    // Check progressive bookmark milestone badges
    const milestones = [1, 5, 10, 25, 50, 100];
    let highestMilestone = 0;
    
    for (const milestone of milestones) {
      if (totalBookmarks >= milestone) {
        highestMilestone = milestone;
      }
    }

    if (highestMilestone > 0) {
      const targetBadgeName = `bookmarks-${highestMilestone}`;
      
      // Remove lower milestone badges and award the highest one
      await this.handleProgressiveBadge(userId, 'bookmarks', targetBadgeName, existingBadgeNames);
    }
  }

  /**
   * Handle progressive badge replacement - remove lower badges and award the highest one
   */
  static async handleProgressiveBadge(userId: string, groupKey: string, targetBadgeName: string, existingBadgeNames: string[]) {
    const badgeGroup = PROGRESSIVE_BADGE_GROUPS[groupKey as keyof typeof PROGRESSIVE_BADGE_GROUPS];
    if (!badgeGroup) return;

    // Find the target badge
    const targetBadge = await prisma.badge.findUnique({
      where: { name: targetBadgeName }
    });

    if (!targetBadge) {
      console.error(`Badge not found: ${targetBadgeName}`);
      return;
    }

    // Check if user already has the target badge
    const hasTargetBadge = existingBadgeNames.includes(targetBadgeName);
    if (hasTargetBadge) return;

    // Find all lower badges in the same group that the user has
    const targetIndex = badgeGroup.indexOf(targetBadgeName);
    const lowerBadges = badgeGroup.slice(0, targetIndex);
    const userLowerBadges = lowerBadges.filter(badgeName => existingBadgeNames.includes(badgeName));

    // Remove all lower badges
    for (const lowerBadgeName of userLowerBadges) {
      const lowerBadge = await prisma.badge.findUnique({
        where: { name: lowerBadgeName }
      });
      
      if (lowerBadge) {
        await prisma.userBadge.deleteMany({
          where: {
            userId,
            badgeId: lowerBadge.id
          }
        });
        console.log(`🗑️ Removed lower badge "${lowerBadge.displayName}" from user ${userId}`);
      }
    }

    // Award the target badge
    await this.awardBadge(userId, targetBadgeName);
  }

  /**
   * Award a specific badge to a user
   */
  static async awardBadge(userId: string, badgeName: string, awardedBy?: string) {
    try {
      const badge = await prisma.badge.findUnique({
        where: { name: badgeName }
      });

      if (!badge) {
        console.error(`Badge not found: ${badgeName}`);
        return;
      }

      // Check if user already has this badge
      const existingBadge = await prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId: badge.id
          }
        }
      });

      if (existingBadge) {
        return; // User already has this badge
      }

      // Award the badge
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
          awardedBy: awardedBy || 'Cantripped'
        }
      });

      console.log(`