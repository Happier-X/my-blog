import tailwindcss from "@tailwindcss/vite";
// import { generateDescription } from "./app/utils/generateDescription";
// import { generateReadingTime } from "./app/utils/generateReadingTime";
// import { generateWordCount } from "./app/utils/generateWordCount";
// import matter from "gray-matter";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "nuxt-studio", "@nuxt/ui", "nuxt-content-git"],
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
      // const parsed = matter(ctx.file.body);
      // parsed.data.description = await generateDescription(parsed.content);
      // parsed.data.readingTime = generateReadingTime(parsed.content);
      // parsed.data.wordCount = generateWordCount(parsed.content);
      // ctx.file.body = matter.stringify(parsed.content, parsed.data);
      const { file, content } = ctx;
      const wordsPerMinute = 180;
      const text = typeof file.body === "string" ? file.body : "";
      const wordCount = text.split(/\s+/).length;
      content.readingTime = Math.ceil(wordCount / wordsPerMinute);
    },
  },
});