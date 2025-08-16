import { prisma } from './prisma';
import { BadgeCategory } from '@prisma/client';

// Progressive badge groups - users can only have the highest badge in each group
const PROGRESSIVE_BADGE_GROUPS = {
  recipes: ['first-recipe', 'recipe-master', 'recipe-legend'],
  votes: ['first-vote', 'voting-enthusiast', 'voting-champion'],
  bookmarks: ['first-bookmark', 'bookmark-collector', 'bookmark-master'],
  tried: ['first-tried', 'tried-enthusiast', 'tried-master']
};

export class BadgeService {
  /**
   * Check and award recipe creation badges
   */
  static async checkRecipeBadges(userId: string) {
    try {
      const recipeCount = await prisma.recipe.count({
        where: { authorId: userId }
      });

      const existingBadgeNames = await this.getUserBadgeNames(userId);
      
      // Check for first recipe badge
      if (recipeCount >= 1 && !existingBadgeNames.includes('first-recipe')) {
        await this.awardBadge(userId, 'first-recipe');
      }

      // Check for recipe master badge
      if (recipeCount >= 10 && !existingBadgeNames.includes('recipe-master')) {
        await this.awardBadge(userId, 'recipe-master');
      }

      // Check for recipe legend badge
      if (recipeCount >= 50 && !existingBadgeNames.includes('recipe-legend')) {
        await this.awardBadge(userId, 'recipe-legend');
      }

      // Handle progressive badges
      if (recipeCount >= 50) {
        await this.handleProgressiveBadge(userId, 'recipes', 'recipe-legend', existingBadgeNames);
      } else if (recipeCount >= 10) {
        await this.handleProgressiveBadge(userId, 'recipes', 'recipe-master', existingBadgeNames);
      } else if (recipeCount >= 1) {
        await this.handleProgressiveBadge(userId, 'recipes', 'first-recipe', existingBadgeNames);
      }
    } catch (error) {
      console.error('Error checking recipe badges:', error);
    }
  }

  /**
   * Check and award voting badges
   */
  static async checkVotingBadges(userId: string) {
    try {
      const voteCount = await prisma.vote.count({
        where: { userId }
      });

      const existingBadgeNames = await this.getUserBadgeNames(userId);
      
      // Check for first vote badge
      if (voteCount >= 1 && !existingBadgeNames.includes('first-vote')) {
        await this.awardBadge(userId, 'first-vote');
      }

      // Check for voting enthusiast badge
      if (voteCount >= 25 && !existingBadgeNames.includes('voting-enthusiast')) {
        await this.awardBadge(userId, 'voting-enthusiast');
      }

      // Check for voting champion badge
      if (voteCount >= 100 && !existingBadgeNames.includes('voting-champion')) {
        await this.awardBadge(userId, 'voting-champion');
      }

      // Handle progressive badges
      if (voteCount >= 100) {
        await this.handleProgressiveBadge(userId, 'votes', 'voting-champion', existingBadgeNames);
      } else if (voteCount >= 25) {
        await this.handleProgressiveBadge(userId, 'votes', 'voting-enthusiast', existingBadgeNames);
      } else if (voteCount >= 1) {
        await this.handleProgressiveBadge(userId, 'votes', 'first-vote', existingBadgeNames);
      }
    } catch (error) {
      console.error('Error checking voting badges:', error);
    }
  }

  /**
   * Check and award bookmark badges
   */
  static async checkBookmarkBadges(userId: string) {
    try {
      const bookmarkCount = await prisma.bookmark.count({
        where: { userId }
      });

      const existingBadgeNames = await this.getUserBadgeNames(userId);
      
      // Check for first bookmark badge
      if (bookmarkCount >= 1 && !existingBadgeNames.includes('first-bookmark')) {
        await this.awardBadge(userId, 'first-bookmark');
      }

      // Check for bookmark collector badge
      if (bookmarkCount >= 10 && !existingBadgeNames.includes('bookmark-collector')) {
        await this.awardBadge(userId, 'bookmark-collector');
      }

      // Check for bookmark master badge
      if (bookmarkCount >= 50 && !existingBadgeNames.includes('bookmark-master')) {
        await this.awardBadge(userId, 'bookmark-master');
      }

      // Handle progressive badges
      if (bookmarkCount >= 50) {
        await this.handleProgressiveBadge(userId, 'bookmarks', 'bookmark-master', existingBadgeNames);
      } else if (bookmarkCount >= 10) {
        await this.handleProgressiveBadge(userId, 'bookmarks', 'bookmark-collector', existingBadgeNames);
      } else if (bookmarkCount >= 1) {
        await this.handleProgressiveBadge(userId, 'bookmarks', 'first-bookmark', existingBadgeNames);
      }
    } catch (error) {
      console.error('Error checking bookmark badges:', error);
    }
  }

  /**
   * Check and award tried badges
   */
  static async checkTriedBadges(userId: string) {
    try {
      const triedCount = await prisma.tried.count({
        where: { userId }
      });

      const existingBadgeNames = await this.getUserBadgeNames(userId);
      
      // Check for first tried badge
      if (triedCount >= 1 && !existingBadgeNames.includes('first-tried')) {
        await this.awardBadge(userId, 'first-tried');
      }

      // Check for tried enthusiast badge
      if (triedCount >= 10 && !existingBadgeNames.includes('tried-enthusiast')) {
        await this.awardBadge(userId, 'tried-enthusiast');
      }

      // Check for tried master badge
      if (triedCount >= 50 && !existingBadgeNames.includes('tried-master')) {
        await this.awardBadge(userId, 'tried-master');
      }

      // Handle progressive badges
      if (triedCount >= 50) {
        await this.handleProgressiveBadge(userId, 'tried', 'tried-master', existingBadgeNames);
      } else if (triedCount >= 10) {
        await this.handleProgressiveBadge(userId, 'tried', 'tried-enthusiast', existingBadgeNames);
      } else if (triedCount >= 1) {
        await this.handleProgressiveBadge(userId, 'tried', 'first-tried', existingBadgeNames);
      }
    } catch (error) {
      console.error('Error checking tried badges:', error);
    }
  }

  /**
   * Check and award bookmark milestone badges
   */
  static async checkBookmarkMilestoneBadges(userId: string) {
    try {
      const totalBookmarks = await prisma.bookmark.count({
        where: { userId }
      });

      const existingBadgeNames = await this.getUserBadgeNames(userId);
      const milestones = [10, 25, 50, 100, 250, 500, 1000];
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
    } catch (error) {
      console.error('Error checking bookmark milestone badges:', error);
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
          awardedBy: awardedBy || 'cantripped'
        }
      });

      console.log(`🏆 Awarded badge "${badge.displayName}" to user ${userId}`);
      
      // Create notification for the user
      await this.createBadgeNotification(userId, badge);
      
    } catch (error) {
      console.error(`Error awarding badge ${badgeName} to user ${userId}:`, error);
    }
  }

  /**
   * Get all badge names for a user
   */
  static async getUserBadgeNames(userId: string): Promise<string[]> {
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true }
    });

    return userBadges.map(ub => ub.badge.name);
  }

  /**
   * Get all badges for a user with details, filtering out lower progressive badges
   */
  static async getUserBadges(userId: string) {
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true,
        admin: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      },
      orderBy: {
        earnedAt: 'desc'
      }
    });

    // Filter out lower progressive badges, keeping only the highest in each group
    const filteredBadges = await this.filterProgressiveBadges(userBadges);

    return filteredBadges;
  }

  /**
   * Filter out lower progressive badges, keeping only the highest achieved badge in each group
   */
  static async filterProgressiveBadges(userBadges: Array<{
    id: string;
    badge: { name: string; displayName: string; description: string; icon: string; color: string; category: string };
    earnedAt: Date;
    awardedBy?: string | null;
  }>) {
    const badgeNames = userBadges.map(ub => ub.badge.name);
    const filteredBadges = [...userBadges];

    // For each progressive group, find the highest badge the user has
    for (const [, badgeGroup] of Object.entries(PROGRESSIVE_BADGE_GROUPS)) {
      let highestBadgeIndex = -1;

      // Find the highest badge in this group that the user has
      for (let i = badgeGroup.length - 1; i >= 0; i--) {
        if (badgeNames.includes(badgeGroup[i])) {
          highestBadgeIndex = i;
          break;
        }
      }

      // Remove all lower badges in this group
      if (highestBadgeIndex > 0) {
        const lowerBadges = badgeGroup.slice(0, highestBadgeIndex);
        for (const lowerBadgeName of lowerBadges) {
          const indexToRemove = filteredBadges.findIndex(ub => ub.badge.name === lowerBadgeName);
          if (indexToRemove !== -1) {
            filteredBadges.splice(indexToRemove, 1);
          }
        }
      }
    }

    return filteredBadges;
  }

  /**
   * Create a notification when a badge is awarded
   */
  static async createBadgeNotification(userId: string, badge: { displayName: string; description: string }) {
    try {
      await prisma.adminNotification.create({
        data: {
          type: 'badge_awarded',
          title: 'New Badge Earned!',
          message: `Congratulations! You've earned the "${badge.displayName}" badge: ${badge.description}`,
          userId,
          adminId: userId, // Self-notification
          reason: 'badge_earned'
        }
      });
    } catch (error) {
      console.error('Error creating badge notification:', error);
    }
  }

  /**
   * Award beta user badge to early adopters
   */
  static async awardBetaUserBadge(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          include: { badge: true }
        }
      }
    });

    if (!user) return;

    const hasBetaBadge = user.userBadges.some(ub => ub.badge.name === 'beta-user');
    const isEarlyUser = user.createdAt < new Date('2025-01-01'); // Adjust date as needed

    if (!hasBetaBadge && isEarlyUser) {
      await this.awardBadge(userId, 'beta-user');
    }
  }

  /**
   * Get all available badges
   */
  static async getAllBadges() {
    try {
      return await prisma.badge.findMany({
        where: { isActive: true },
        orderBy: [
          { category: 'asc' },
          { triggerValue: 'asc' }
        ]
      });
    } catch (error) {
      console.error('Error fetching badges:', error);
      // Return empty array if table doesn't exist or other error
      return [];
    }
  }

  /**
   * Get badges by category
   */
  static async getBadgesByCategory(category: string) {
    return await prisma.badge.findMany({
      where: { 
        category: category as BadgeCategory,
        isActive: true 
      },
      orderBy: { triggerValue: 'asc' }
    });
  }
}