import { prisma } from './prisma';

export interface BadgeAward {
  userId: string;
  badgeName: string;
  reason?: string;
}

export class BadgeService {
  /**
   * Check and award badges for recipe creation
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
    const existingBadges = user.userBadges.map(ub => ub.badge.name);

    // Check first recipe badge
    if (recipeCount === 1 && !existingBadges.includes('first-recipe')) {
      await this.awardBadge(userId, 'first-recipe');
    }

    // Check recipe milestone badges
    const milestones = [1, 5, 10, 25, 50, 100];
    for (const milestone of milestones) {
      if (recipeCount >= milestone && !existingBadges.includes(`recipe-${milestone}`)) {
        await this.awardBadge(userId, `recipe-${milestone}`);
      }
    }
  }

  /**
   * Check and award badges for likes received
   */
  static async checkLikeBadges(userId: string) {
    const totalLikes = await prisma.vote.count({
      where: {
        recipe: { authorId: userId },
        value: 1
      }
    });

    const existingBadges = await this.getUserBadgeNames(userId);
    const milestones = [1, 5, 10, 25, 50, 100];

    // Check first like badge
    if (totalLikes === 1 && !existingBadges.includes('first-like')) {
      await this.awardBadge(userId, 'first-like');
    }

    // Check like milestone badges
    for (const milestone of milestones) {
      if (totalLikes >= milestone && !existingBadges.includes(`likes-${milestone}`)) {
        await this.awardBadge(userId, `likes-${milestone}`);
      }
    }
  }

  /**
   * Check and award badges for tries received
   */
  static async checkTriedBadges(userId: string) {
    const totalTries = await prisma.tried.count({
      where: {
        recipe: { authorId: userId }
      }
    });

    const existingBadges = await this.getUserBadgeNames(userId);
    const milestones = [1, 5, 10, 25, 50, 100];

    // Check first tried badge
    if (totalTries === 1 && !existingBadges.includes('first-tried')) {
      await this.awardBadge(userId, 'first-tried');
    }

    // Check tried milestone badges
    for (const milestone of milestones) {
      if (totalTries >= milestone && !existingBadges.includes(`tried-${milestone}`)) {
        await this.awardBadge(userId, `tried-${milestone}`);
      }
    }
  }

  /**
   * Check and award badges for bookmarks received
   */
  static async checkBookmarkBadges(userId: string) {
    const totalBookmarks = await prisma.bookmark.count({
      where: {
        recipe: { authorId: userId }
      }
    });

    const existingBadges = await this.getUserBadgeNames(userId);
    const milestones = [1, 5, 10, 25, 50, 100];

    // Check bookmark milestone badges
    for (const milestone of milestones) {
      if (totalBookmarks >= milestone && !existingBadges.includes(`bookmarks-${milestone}`)) {
        await this.awardBadge(userId, `bookmarks-${milestone}`);
      }
    }
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
          awardedBy
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
   * Get all badges for a user with details
   */
  static async getUserBadges(userId: string) {
    return await prisma.userBadge.findMany({
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
  }

  /**
   * Create a notification when a badge is awarded
   */
  static async createBadgeNotification(userId: string, badge: any) {
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
    return await prisma.badge.findMany({
      where: { isActive: true },
      orderBy: [
        { category: 'asc' },
        { triggerValue: 'asc' }
      ]
    });
  }

  /**
   * Get badges by category
   */
  static async getBadgesByCategory(category: string) {
    return await prisma.badge.findMany({
      where: { 
        category: category as any,
        isActive: true 
      },
      orderBy: { triggerValue: 'asc' }
    });
  }
} 