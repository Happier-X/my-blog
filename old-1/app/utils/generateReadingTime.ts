import type { ContentFile } from "@nuxt/content";

export function generateReadingTime(content: string): number {
  const wordsPerMinute = 180;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
