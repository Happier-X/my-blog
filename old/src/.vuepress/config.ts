import { getDirname, path } from "vuepress/utils";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Happier's Blog",
  description: "悟已往之不谏，知来者之可追。",
  theme,
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },
});
