import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "茕茕の博客",
  description: "分享我的学习和生活，希望你能有所收获",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
