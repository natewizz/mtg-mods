// Content filter for preventing offensive language in recipes
// This list includes common offensive words and variations

const OFFENSIVE_WORDS = [
  // Common profanity and offensive terms
  'fuck', 'fucking', 'fucker', 'fuckin',
  'shit', 'shitting', 'shitter',
  'bitch', 'bitching', 'bitches',
  'ass', 'asshole', 'assholes',
  'dick', 'dicks', 'dickhead', 'dickheads',
  'cock', 'cocks', 'cockhead',
  'pussy', 'pussies',
  'cunt', 'cunts',
  'whore', 'whores', 'whoring',
  'slut', 'sluts', 'slutty',
  'bastard', 'bastards',
  'damn', 'damned', 'damning',
  'hell', 'hells',
  'god damn', 'goddamn', 'goddamned',
  'jesus christ', 'jesus fucking christ',
  
  // Hate speech and discriminatory terms
  'nigger', 'niggers', 'nigga', 'niggas',
  'faggot', 'faggots', 'fag', 'fags',
  'dyke', 'dykes',
  'kike', 'kikes',
  'spic', 'spics',
  'chink', 'chinks',
  'gook', 'gooks',
  'wetback', 'wetbacks',
  'towelhead', 'towelheads',
  'sand nigger', 'sand niggers',
  'raghead', 'ragheads',
  'camel jockey', 'camel jockeys',
  'terrorist', 'terrorists',
  'nazi', 'nazis',
  'hitler', 'hitlerian',
  
  // Sexual content
  'porn', 'pornography', 'pornographic',
  'sex', 'sexual', 'sexually',
  'penis', 'penises',
  'vagina', 'vaginas',
  'boob', 'boobs', 'boobie', 'boobies',
  'tit', 'tits', 'tittie', 'titties',
  'nipple', 'nipples',
  'dildo', 'dildos',
  'vibrator', 'vibrators',
  'condom', 'condoms',
  'sperm', 'semen',
  'cum', 'cumming',
  'orgasm', 'orgasms',
  'masturbate', 'masturbating', 'masturbation',
  'blowjob', 'blowjobs',
  'handjob', 'handjobs',
  'fellatio', 'cunnilingus',
  
  // Violence and threats
  'kill', 'killing', 'killer', 'killers',
  'murder', 'murdering', 'murderer', 'murderers',
  'suicide', 'suicidal',
  'bomb', 'bombs', 'bombing',
  'shoot', 'shooting', 'shooter', 'shooters',
  'gun', 'guns', 'gunner',
  'knife', 'knives', 'stabbing',
  'rape', 'raping', 'rapist', 'rapists',
  'torture', 'torturing', 'torturer',
  'abuse', 'abusing', 'abuser', 'abusers',
  
  // Drugs and illegal substances
  'cocaine', 'coke',
  'heroin', 'heroine',
  'meth', 'methamphetamine',
  'crack', 'crack cocaine',
  'weed', 'marijuana', 'pot',
  'hash', 'hashish',
  'lsd', 'acid',
  'ecstasy', 'mdma',
  'speed', 'amphetamine',
  'pills', 'drugs', 'drug',
  'inject', 'injecting', 'injection',
  'snort', 'snorting', 'snorted',
  'smoke', 'smoking', 'smoked',
  
  // Common misspellings and variations
  'fuk', 'fuking', 'fuker',
  'shyt', 'shite',
  'bich', 'biches',
  'asshle', 'ashole',
  'dik', 'diks',
  'cok', 'coks',
  'pusy', 'pussys',
  'cnt', 'knt',
  'whre', 'whres',
  'slutty', 'slutty',
  'bastrd', 'bastrds',
  'dam', 'damm',
  'hel', 'hells',
  'goddam', 'goddamit',
  'jesus fuking christ',
  
  // Leetspeak variations
  'f*ck', 'f**k', 'f***', 'f****',
  'sh*t', 'sh**', 'sh***',
  'b*tch', 'b**ch', 'b***h',
  'a**', 'a***', 'a****',
  'd*ck', 'd**k', 'd***',
  'c*ck', 'c**k', 'c***',
  'p*ssy', 'p**sy', 'p***y',
  'c*nt', 'c**t', 'c***',
  'wh*re', 'wh**e', 'wh***',
  'sl*t', 'sl**t', 'sl***',
  'b*stard', 'b**tard', 'b***ard',
  'd*mn', 'd**n', 'd***',
  'h*ll', 'h**l', 'h***',
  'g*d', 'g**', 'g***',
  'j*sus', 'j**us', 'j***s',
];

// Normalize text for better matching (remove punctuation, convert to lowercase)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Check for spaced/dotted variations of offensive words
function checkSpacedVariations(text: string): string[] {
  const foundWords: string[] = [];
  const normalizedText = text.toLowerCase();
  
  // Check for spaced variations (e.g., "f u c k", "s h i t")
  for (const word of OFFENSIVE_WORDS) {
    if (word.length <= 2) continue; // Skip very short words
    
    // Create spaced version (e.g., "f u c k")
    const spacedVersion = word.split('').join(' ');
    if (normalizedText.includes(spacedVersion)) {
      foundWords.push(word);
    }
    
    // Create dotted version (e.g., "f.u.c.k")
    const dottedVersion = word.split('').join('.');
    if (normalizedText.includes(dottedVersion)) {
      foundWords.push(word);
    }
    
    // Create dash version (e.g., "f-u-c-k")
    const dashVersion = word.split('').join('-');
    if (normalizedText.includes(dashVersion)) {
      foundWords.push(word);
    }
    
    // Create underscore version (e.g., "f_u_c_k")
    const underscoreVersion = word.split('').join('_');
    if (normalizedText.includes(underscoreVersion)) {
      foundWords.push(word);
    }
  }
  
  return foundWords;
}

// Check if text contains offensive words
export function containsOffensiveContent(text: string): { hasOffensiveContent: boolean; offensiveWords: string[] } {
  const normalizedText = normalizeText(text);
  const words = normalizedText.split(' ');
  const foundOffensiveWords: string[] = [];
  
  // Check for regular offensive words
  for (const word of words) {
    if (OFFENSIVE_WORDS.includes(word)) {
      foundOffensiveWords.push(word);
    }
  }
  
  // Check for spaced/dotted variations
  const spacedVariations = checkSpacedVariations(text);
  foundOffensiveWords.push(...spacedVariations);
  
  return {
    hasOffensiveContent: foundOffensiveWords.length > 0,
    offensiveWords: [...new Set(foundOffensiveWords)] // Remove duplicates
  };
}

// Check recipe content (title and instructions)
export function validateRecipeContent(title: string, instructions: string): {
  isValid: boolean;
  errors: string[];
  offensiveWords: string[];
} {
  const titleCheck = containsOffensiveContent(title);
  const instructionsCheck = containsOffensiveContent(instructions);
  
  const allOffensiveWords = [...titleCheck.offensiveWords, ...instructionsCheck.offensiveWords];
  const uniqueOffensiveWords = [...new Set(allOffensiveWords)];
  
  const errors: string[] = [];
  
  if (titleCheck.hasOffensiveContent) {
    errors.push('Recipe title contains inappropriate language');
  }
  
  if (instructionsCheck.hasOffensiveContent) {
    errors.push('Recipe instructions contain inappropriate language');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    offensiveWords: uniqueOffensiveWords
  };
}

// Get a user-friendly error message
export function getContentFilterErrorMessage(offensiveWords: string[]): string {
  if (offensiveWords.length === 0) {
    return '';
  }
  
  const wordList = offensiveWords.slice(0, 3).join(', ');
  const moreWords = offensiveWords.length > 3 ? ` and ${offensiveWords.length - 3} more` : '';
  
  return `Your content contains inappropriate language (${wordList}${moreWords}). Please revise your recipe to remove offensive terms and ensure it's appropriate for all audiences.`;
} 