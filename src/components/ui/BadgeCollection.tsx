'use client';

import Badge from './Badge';

interface BadgeData {
  id: string;
  badge: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    icon: string;
    color: string;
    category: string;
  };
  earnedAt: string;
  awardedBy?: {
    name?: string;
    username?: string;
  };
}

interface BadgeCollectionProps {
  badges: BadgeData[];
  showCategoryHeaders?: boolean;
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BadgeCollection({
  badges,
  showCategoryHeaders = true,
  maxDisplay,
  size = 'md',
  className = ''
}: BadgeCollectionProps) {
  if (!badges || badges.length === 0) {
    return (
      <div className={`text-gray-500 text-center py-4 ${className}`}>
        No badges earned yet
      </div>
    );
  }

  // Group badges by category
  const groupedBadges = badges.reduce((acc, badge) => {
    const category = badge.badge.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, BadgeData[]>);

  // Sort categories by priority
  const categoryOrder = ['ROLE', 'SPECIAL', 'ACHIEVEMENT', 'MILESTONE', 'STREAK', 'COMMUNITY'];
  
  const sortedCategories = Object.keys(groupedBadges).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    return aIndex - bIndex;
  });

  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;
  const hasMore = maxDisplay && badges.length > maxDisplay;

  if (!showCategoryHeaders) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {displayBadges.map((badge) => (
          <Badge
            key={badge.id}
            icon={badge.badge.icon}
            color={badge.badge.color}
            displayName={badge.badge.displayName}
            description={badge.badge.description}
            earnedAt={badge.earnedAt}
            awardedBy={badge.awardedBy}
            size={size}
          />
        ))}
        {hasMore && (
          <div className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'} bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-medium`}>
            +{badges.length - maxDisplay!}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {sortedCategories.map((category) => {
        const categoryBadges = groupedBadges[category];
        const displayCategoryBadges = maxDisplay ? categoryBadges.slice(0, maxDisplay) : categoryBadges;
        const categoryHasMore = maxDisplay && categoryBadges.length > maxDisplay;

        return (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 capitalize">
              {category.toLowerCase().replace('_', ' ')} Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayCategoryBadges.map((badge) => (
                <Badge
                  key={badge.id}
                  icon={badge.badge.icon}
                  color={badge.badge.color}
                  displayName={badge.badge.displayName}
                  description={badge.badge.description}
                  earnedAt={badge.earnedAt}
                  awardedBy={badge.awardedBy}
                  size={size}
                />
              ))}
              {categoryHasMore && (
                <div className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'} bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-medium`}>
                  +{categoryBadges.length - maxDisplay!}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
} 