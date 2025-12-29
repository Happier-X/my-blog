import tailwindcss from "@tailwindcss/vite";
import { generateDescription } from "./app/utils/generateDescription";
import { generateReadingTime } from "./app/utils/generateReadingTime";
import { generateWordCount } from "./app/utils/generateWordCount";
import matter from "gray-matter";

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
    async "content:file:beforeParse"(ctx) {
      console.log(11111111111, ctx);
      console.log(22222222222, ctx.file, ctx.collection);

      // 使用 gray-matter 解析文件内容
      const parsed = matter(ctx.file.body);

      // 修改 description 字段
      parsed.data.description = "测试一下";

      // 将修改后的内容写回
      ctx.file.body = matter.stringify(parsed.content, parsed.data);
    },
  },
});
