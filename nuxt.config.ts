import tailwindcss from "@tailwindcss/vite";
import { generateDescription } from "./app/utils/generateDescription";
import { generateReadingTime } from "./app/utils/generateReadingTime";
import { generateWordCount } from "./app/utils/generateWordCount";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "nuxt-studio", "@nuxt/ui"],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  studio: {
    repository: {
      provider: "github", // 'github' or 'gitlab'
      owner: "Happier-X",
      repo: "my-blog",
      branch: "main",
    },
    i18n: {
      defaultLocale: "zh",
    },
  },
  hooks: {
    async "content:file:afterParse"(ctx) {
      const { file, content } = ctx;
      content.readingTime = generateReadingTime(file);
      content.wordCount = generateWordCount(file);
      content.description = await generateDescription(file);
    },
  },
});
