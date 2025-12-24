import type { ContentFile } from "@nuxt/content";

export function generateReadingTime(file: ContentFile): number {
  const wordsPerMinute = 180;
  const text = typeof file.body === "string" ? file.body : "";
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
