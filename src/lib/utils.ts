/**
 * Utility functions for the MTG Mods application
 */

/**
 * Converts a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim();
}

/**
 * Generates a recipe URL using just the title
 * @param title Recipe title
 * @returns URL path for the recipe
 */
export function getRecipeUrl(title: string): string {
  const slug = slugify(title);
  return `/recipes/${slug}`;
} 