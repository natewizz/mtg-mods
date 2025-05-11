// MTG-themed username generator

export const mtgAdjectives = [
  "Mystic", "Arcane", "Celestial", "Wild", "Feral", "Ancient", "Eldritch", "Ethereal",
  "Vengeful", "Fiery", "Frozen", "Ghostly", "Exalted", "Savage", "Chaotic", "Serene",
  "Spectral", "Void", "Crimson", "Azure", "Emerald", "Golden", "Silver", "Immortal",
  "Dark", "Bright", "Shadowy", "Astral", "Planar", "Temporal", "Divine", "Demonic",
  "Enchanted", "Mysterious", "Nimble", "Eternal", "Primal", "Swift", "Loyal", "Rogue",
  "Elite", "Wise", "Cunning", "Brave", "Mighty", "Vicious", "Vigilant", "Stoic",
  "Resolute", "Glorious", "Thunderous", "Abyssal", "Radiant", "Umbral", "Shimmering"
];

export const mtgNouns = [
  "Wizard", "Mage", "Dragon", "Phoenix", "Elemental", "Knight", "Warrior", "Cleric",
  "Druid", "Ranger", "Rogue", "Paladin", "Elf", "Dwarf", "Goblin", "Vampire",
  "Werewolf", "Zombie", "Angel", "Demon", "Sphinx", "Griffin", "Hydra", "Titan",
  "Oracle", "Seer", "Summoner", "Artificer", "Berserker", "Necromancer", "Pyromancer",
  "Geomancer", "Spellbinder", "Enchanter", "Arcanist", "Illusionist", "Conjurer",
  "Warlock", "Sorcerer", "Shaman", "Barbarian", "Monk", "Bard", "Dragonborn", "Golem",
  "Giant", "Troll", "Djinn", "Leviathan", "Kraken", "Wurm", "Minotaur", "Centaur"
];

/**
 * Generates a random MTG-themed username
 * Format options:
 * - adjective-adjective-noun (e.g., MysticAncientWizard)
 * - adjective-noun-noun (e.g., WildDragonElf)
 */
export function generateMtgUsername(): string {
  // Randomly decide which format to use
  const useDoubleAdjective = Math.random() > 0.5;
  
  if (useDoubleAdjective) {
    // Format: adjective-adjective-noun
    const adj1 = mtgAdjectives[Math.floor(Math.random() * mtgAdjectives.length)];
    const adj2 = mtgAdjectives[Math.floor(Math.random() * mtgAdjectives.length)];
    const noun = mtgNouns[Math.floor(Math.random() * mtgNouns.length)];
    
    // Make sure adjectives are different
    if (adj1 === adj2) {
      return generateMtgUsername(); // Try again
    }
    
    return `${adj1}${adj2}${noun}`;
  } else {
    // Format: adjective-noun-noun
    const adj = mtgAdjectives[Math.floor(Math.random() * mtgAdjectives.length)];
    const noun1 = mtgNouns[Math.floor(Math.random() * mtgNouns.length)];
    const noun2 = mtgNouns[Math.floor(Math.random() * mtgNouns.length)];
    
    // Make sure nouns are different
    if (noun1 === noun2) {
      return generateMtgUsername(); // Try again
    }
    
    return `${adj}${noun1}${noun2}`;
  }
}

/**
 * Check if a username is available
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/users/check-username?username=${encodeURIComponent(username)}`);
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
} 