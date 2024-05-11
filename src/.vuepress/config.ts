import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/MyBlog/",

  lang: "zh-CN",
  title: "茕茕の博客",
  description: "分享我的学习和生活",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
