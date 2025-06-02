// Tag categories mapped to Magic: The Gathering colors
export const tagCategories = {
  // White - Mechanics & Effects
  mechanics: ['tokens', 'counters', 'life-gain', 'damage', 'buff', 'debuff', 'copy', 'exile', 'tutor', 'draw', 'discard', 'scry', 'mill', 'dice'],
  
  // Blue - Timing & Triggers
  timingTriggers: ['upkeep', 'draw-step', 'combat', 'end-step', 'enters-battlefield', 'dies'],
  
  // Green (Charcoal in our color scheme) - Card Types
  cardTypes: ['creature', 'instant', 'sorcery', 'artifact', 'enchantment', 'land'],
  
  // Red - Format & Play-style
  formatPlaystyle: ['commander', 'standard', 'pauper', 'multiplayer', '1v1', 'draft', 'singleton'],
  
  // Black (Soft Gold in our color scheme) - Strategy & Theme
  strategyTheme: ['aggro', 'control', 'combo', 'political', 'group-decision', 'chaos', 'tribal', 'budget-friendly'],
  
  // Additional categories could be added here as the app evolves
  complexity: ['beginner', 'intermediate', 'advanced', 'quick-play', 'in-depth'],
  social: ['popular', 'bookmarked', 'tried', 'featured'],
};

export type TagCategoryType = 
  | 'mechanics' 
  | 'timingTriggers' 
  | 'cardTypes' 
  | 'formatPlaystyle' 
  | 'strategyTheme'
  | 'complexity'
  | 'social'
  | 'default';

/**
 * Determine the category of a tag based on its name
 */
export function getTagCategory(tagName: string): TagCategoryType {
  const normalizedTag = tagName.toLowerCase().trim();
  
  // Check each category to find a match
  for (const [category, tags] of Object.entries(tagCategories)) {
    if (tags.includes(normalizedTag)) {
      return category as TagCategoryType;
    }
  }
  
  return 'default';
}

/**
 * Get the appropriate CSS classes for a tag based on its category
 */
export function getTagStyle(tagName: string): { 
  bgClass: string, 
  textClass: string,
  bgStyle: Record<string, string>,
  textStyle: Record<string, string>
} {
  const category = getTagCategory(tagName);
  const lowerTag = tagName.toLowerCase();

  // Helper for creating style objects
  const createStyles = (
    bg: string, 
    text: string, 
    border?: string, 
    gradientFrom?: string, 
    gradientTo?: string
  ) => {
    const bgStyle: Record<string, string> = {};
    const textStyle = { color: text };
    
    if (gradientFrom && gradientTo) {
      bgStyle.background = `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`;
    } else {
      bgStyle.backgroundColor = bg;
    }
    
    if (border) {
      bgStyle.border = `1px solid ${border}`;
    }
    
    return { bgStyle, textStyle };
  };

  // MTG Single Colors
  if (lowerTag === 'white') {
    const styles = createStyles('var(--mtg-plains-bg)', 'var(--mtg-plains-text)', 'var(--mtg-plains-border)');
    return { 
      bgClass: 'bg-[var(--mtg-plains-bg)] border border-[var(--mtg-plains-border)]', 
      textClass: 'text-[var(--mtg-plains-text)]',
      ...styles
    };
  } else if (lowerTag === 'blue') {
    const styles = createStyles('var(--mtg-island-bg)', 'var(--mtg-island-text)', 'var(--mtg-island-border)');
    return { 
      bgClass: 'bg-[var(--mtg-island-bg)] border border-[var(--mtg-island-border)]', 
      textClass: 'text-[var(--mtg-island-text)]',
      ...styles
    };
  } else if (lowerTag === 'black') {
    const styles = createStyles('var(--mtg-swamp-bg)', 'var(--mtg-swamp-text)', 'var(--mtg-swamp-border)');
    return { 
      bgClass: 'bg-[var(--mtg-swamp-bg)] border border-[var(--mtg-swamp-border)]', 
      textClass: 'text-[var(--mtg-swamp-text)]',
      ...styles
    };
  } else if (lowerTag === 'red') {
    const styles = createStyles('var(--mtg-mountain-bg)', 'var(--mtg-mountain-text)', 'var(--mtg-mountain-border)');
    return { 
      bgClass: 'bg-[var(--mtg-mountain-bg)] border border-[var(--mtg-mountain-border)]', 
      textClass: 'text-[var(--mtg-mountain-text)]',
      ...styles
    };
  } else if (lowerTag === 'green') {
    const styles = createStyles('var(--mtg-forest-bg)', 'var(--mtg-forest-text)', 'var(--mtg-forest-border)');
    return { 
      bgClass: 'bg-[var(--mtg-forest-bg)] border border-[var(--mtg-forest-border)]', 
      textClass: 'text-[var(--mtg-forest-text)]',
      ...styles
    };
  }

  // MTG Guild Combinations (Two Colors)
  const createGuildStyle = (color1Bg: string, color1Border: string, color2Bg: string, textColor?: string) => {
    const bgStyle: Record<string, string> = {
      background: `linear-gradient(to right, var(${color1Bg}), var(${color2Bg}))`,
      border: `1px solid var(${color1Border})`
    };
    
    const textStyle: Record<string, string> = {
      color: textColor ? `var(${textColor})` : '#FFFFFF'
    };
    
    return {
      bgClass: `bg-gradient-to-r from-[var(${color1Bg})] to-[var(${color2Bg})] border border-[var(${color1Border})]`,
      textClass: textColor ? `text-[var(${textColor})]` : 'text-white',
      bgStyle,
      textStyle
    };
  };

  if (lowerTag === 'azorius' || (lowerTag.includes('white') && lowerTag.includes('blue'))) {
    return createGuildStyle('--mtg-plains-bg', '--mtg-plains-border', '--mtg-island-bg', '--mtg-plains-text');
  } else if (lowerTag === 'dimir' || (lowerTag.includes('blue') && lowerTag.includes('black'))) {
    return createGuildStyle('--mtg-island-bg', '--mtg-island-border', '--mtg-swamp-bg', '--mtg-swamp-text');
  } else if (lowerTag === 'rakdos' || (lowerTag.includes('black') && lowerTag.includes('red'))) {
    return createGuildStyle('--mtg-swamp-bg', '--mtg-swamp-border', '--mtg-mountain-bg', '--mtg-swamp-text');
  } else if (lowerTag === 'gruul' || (lowerTag.includes('red') && lowerTag.includes('green'))) {
    return createGuildStyle('--mtg-mountain-bg', '--mtg-mountain-border', '--mtg-forest-bg', '--mtg-mountain-text');
  } else if (lowerTag === 'selesnya' || (lowerTag.includes('green') && lowerTag.includes('white'))) {
    return createGuildStyle('--mtg-forest-bg', '--mtg-forest-border', '--mtg-plains-bg', '--mtg-forest-text');
  } else if (lowerTag === 'orzhov' || (lowerTag.includes('white') && lowerTag.includes('black'))) {
    return createGuildStyle('--mtg-plains-bg', '--mtg-plains-border', '--mtg-swamp-bg', '--mtg-swamp-text');
  } else if (lowerTag === 'izzet' || (lowerTag.includes('blue') && lowerTag.includes('red'))) {
    return createGuildStyle('--mtg-island-bg', '--mtg-island-border', '--mtg-mountain-bg', '--mtg-island-text');
  } else if (lowerTag === 'golgari' || (lowerTag.includes('black') && lowerTag.includes('green'))) {
    return createGuildStyle('--mtg-swamp-bg', '--mtg-swamp-border', '--mtg-forest-bg', '--mtg-swamp-text');
  } else if (lowerTag === 'boros' || (lowerTag.includes('red') && lowerTag.includes('white'))) {
    return createGuildStyle('--mtg-mountain-bg', '--mtg-mountain-border', '--mtg-plains-bg', '--mtg-mountain-text');
  } else if (lowerTag === 'simic' || (lowerTag.includes('green') && lowerTag.includes('blue'))) {
    return createGuildStyle('--mtg-forest-bg', '--mtg-forest-border', '--mtg-island-bg', '--mtg-forest-text');
  }

  // Special MTG Terms
  if (lowerTag === 'commander') {
    const styles = createStyles(
      'linear-gradient(to right, var(--mtg-gold-from), var(--mtg-gold-to))', 
      'var(--mtg-gold-text)', 
      'var(--mtg-gold-border)'
    );
    return { 
      bgClass: 'bg-gradient-to-r from-[var(--mtg-gold-from)] to-[var(--mtg-gold-to)] border border-[var(--mtg-gold-border)]', 
      textClass: 'text-[var(--mtg-gold-text)] font-bold',
      bgStyle: styles.bgStyle,
      textStyle: { ...styles.textStyle, fontWeight: 'bold' }
    };
  } else if (lowerTag === 'mana' || lowerTag === 'ramp') {
    const styles = createStyles('var(--mtg-island-bg)', 'var(--mtg-island-text)', 'var(--mtg-island-border)');
    styles.bgStyle.opacity = '0.7';
    return { 
      bgClass: 'bg-[var(--mtg-island-bg)] opacity-70 border border-[var(--mtg-island-border)]', 
      textClass: 'text-[var(--mtg-island-text)]',
      ...styles
    };
  } else if (lowerTag === 'combo') {
     return createGuildStyle('--mtg-island-bg', '--mtg-island-border', '--mtg-mountain-bg', '--mtg-gold-text');
  } else if (lowerTag === 'control') {
    const styles = createStyles('var(--mtg-island-bg)', 'var(--mtg-island-text)', 'var(--mtg-island-border)');
    return { 
      bgClass: 'bg-[var(--mtg-island-bg)] border border-[var(--mtg-island-border)]', 
      textClass: 'text-[var(--mtg-island-text)]',
      ...styles
    };
  } else if (lowerTag === 'aggro') {
    const styles = createStyles('var(--mtg-mountain-bg)', 'var(--mtg-mountain-text)', 'var(--mtg-mountain-border)');
    return { 
      bgClass: 'bg-[var(--mtg-mountain-bg)] border border-[var(--mtg-mountain-border)]', 
      textClass: 'text-[var(--mtg-mountain-text)]',
      ...styles
    };
  } else if (lowerTag === 'tribal') {
    const styles = createStyles('var(--mtg-forest-bg)', 'var(--mtg-forest-text)', 'var(--mtg-forest-border)');
    return { 
      bgClass: 'bg-[var(--mtg-forest-bg)] border border-[var(--mtg-forest-border)]', 
      textClass: 'text-[var(--mtg-forest-text)]',
      ...styles
    };
  } else if (lowerTag === 'tokens') {
    return createGuildStyle('--mtg-forest-bg', '--mtg-forest-border', '--mtg-plains-bg', '--mtg-forest-text');
  } else if (lowerTag === 'graveyard') {
    const styles = createStyles('var(--mtg-swamp-bg)', 'var(--mtg-swamp-text)', 'var(--mtg-swamp-border)');
    return { 
      bgClass: 'bg-[var(--mtg-swamp-bg)] border border-[var(--mtg-swamp-border)]', 
      textClass: 'text-[var(--mtg-swamp-text)]',
      ...styles
    };
  } else if (lowerTag === 'multiplayer') {
    const bgStyle = {
      background: 'linear-gradient(to right, var(--mtg-plains-bg), var(--mtg-island-bg), var(--mtg-forest-bg))',
      border: '1px solid var(--mtg-plains-border)'
    };
    return { 
      bgClass: 'bg-gradient-to-r from-[var(--mtg-plains-bg)] via-[var(--mtg-island-bg)] to-[var(--mtg-forest-bg)] border border-[var(--mtg-plains-border)]', 
      textClass: 'text-black',
      bgStyle,
      textStyle: { color: '#000000' }
    };
  } else if (lowerTag === 'chaos') {
    const bgStyle = {
      background: 'linear-gradient(to right, var(--mtg-island-bg), var(--mtg-swamp-bg), var(--mtg-mountain-bg))',
      border: '1px solid var(--mtg-island-border)'
    };
    return { 
      bgClass: 'bg-gradient-to-r from-[var(--mtg-island-bg)] via-[var(--mtg-swamp-bg)] to-[var(--mtg-mountain-bg)] border border-[var(--mtg-island-border)]', 
      textClass: 'text-white',
      bgStyle,
      textStyle: { color: '#FFFFFF' }
    };
  }

  // Category-based Fallbacks with inline styles
  const categoryStyles: Record<TagCategoryType, { bgClass: string; textClass: string; bgStyle: Record<string, string>; textStyle: Record<string, string> }> = {
    mechanics: {
      bgClass: 'bg-gradient-to-r from-[var(--mtg-plains-bg)] to-gray-100 border border-[var(--mtg-plains-border)]',
      textClass: 'text-[var(--mtg-plains-text)]',
      bgStyle: {
        background: 'linear-gradient(to right, var(--mtg-plains-bg), #f3f4f6)',
        border: '1px solid var(--mtg-plains-border)'
      },
      textStyle: { color: 'var(--mtg-plains-text)' }
    },
    timingTriggers: {
      bgClass: 'bg-gradient-to-r from-[var(--mtg-island-bg)] to-blue-200 border border-[var(--mtg-island-border)]',
      textClass: 'text-[var(--mtg-island-text)]',
      bgStyle: {
        background: 'linear-gradient(to right, var(--mtg-island-bg), #bfdbfe)',
        border: '1px solid var(--mtg-island-border)'
      },
      textStyle: { color: 'var(--mtg-island-text)' }
    },
    cardTypes: {
      bgClass: 'bg-gradient-to-r from-[var(--mtg-artifact-bg)] to-slate-200 border border-[var(--mtg-artifact-border)]',
      textClass: 'text-[var(--mtg-artifact-text)]',
      bgStyle: {
        background: 'linear-gradient(to right, var(--mtg-artifact-bg), #e2e8f0)',
        border: '1px solid var(--mtg-artifact-border)'
      },
      textStyle: { color: 'var(--mtg-artifact-text)' }
    },
    formatPlaystyle: {
      bgClass: 'bg-gradient-to-r from-[var(--mtg-gold-from)] to-yellow-200 border border-[var(--mtg-gold-border)] opacity-80',
      textClass: 'text-[var(--mtg-gold-text)]',
      bgStyle: {
        background: 'linear-gradient(to right, var(--mtg-gold-from), #fef08a)',
        border: '1px solid var(--mtg-gold-border)',
        opacity: '0.8'
      },
      textStyle: { color: 'var(--mtg-gold-text)' }
    },
    strategyTheme: {
      bgClass: 'bg-gradient-to-r from-[var(--mtg-swamp-bg)] to-gray-600 border border-[var(--mtg-swamp-border)]',
      textClass: 'text-[var(--mtg-swamp-text)]',
      bgStyle: {
        background: 'linear-gradient(to right, var(--mtg-swamp-bg), #4b5563)',
        border: '1px solid var(--mtg-swamp-border)'
      },
      textStyle: { color: 'var(--mtg-swamp-text)' }
    },
    complexity: {
      bgClass: 'bg-[var(--mtg-gold-from)] border border-[var(--mtg-gold-border)] opacity-70',
      textClass: 'text-[var(--mtg-gold-text)]',
      bgStyle: {
        backgroundColor: 'var(--mtg-gold-from)',
        border: '1px solid var(--mtg-gold-border)',
        opacity: '0.7'
      },
      textStyle: { color: 'var(--mtg-gold-text)' }
    },
    social: {
      bgClass: 'bg-[var(--mtg-artifact-bg)] border border-[var(--mtg-artifact-border)] opacity-70',
      textClass: 'text-[var(--mtg-artifact-text)]',
      bgStyle: {
        backgroundColor: 'var(--mtg-artifact-bg)',
        border: '1px solid var(--mtg-artifact-border)',
        opacity: '0.7'
      },
      textStyle: { color: 'var(--mtg-artifact-text)' }
    },
    default: {
      bgClass: 'bg-gray-400 border border-gray-500',
      textClass: 'text-white',
      bgStyle: {
        backgroundColor: '#9ca3af',
        border: '1px solid #6b7280'
      },
      textStyle: { color: '#ffffff' }
    }
  };

  return categoryStyles[category];
} 