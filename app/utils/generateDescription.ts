import type { ContentFile } from "@nuxt/content";

export function generateDescription(file: ContentFile): string {
  const text = typeof file.body === "string" ? file.body : "";
  return text.split("\n")[0] || "";
}
