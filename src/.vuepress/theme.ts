import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme(
  {
    hotReload: true,
    fullscreen: true,
    hostname: "https://blog.happierx.top/",
    author: {
      name: "Happier",
      url: "/AboutMe/",
    },
    iconAssets: "//at.alicdn.com/t/c/font_4729614_6gl9dhn0nkc.css",
    iconPrefix: "iconfont icon-",
    logo: "https://happier-blog.oss-cn-qingdao.aliyuncs.com/assets/logo.jpg",
    repoDisplay: true,
    repo: "https://github.com/Happier-X/my-blog",
    docsDir: "src",
    navbar,
    sidebar,
    copyright: "Copyright © 2024-present Happier",
    displayFooter: true,
    blog: {
      description: "悟已往之不谏，知来者之可追",
      intro: "/AboutMe/",
      medias: {
        BiliBili: "https://space.bilibili.com/401106272",
        Email: "mailto:zhf5256@qq.com",
        GitHub: "https://github.com/Happier-X",
      },
    },
    metaLocales: {
      editLink: "在 GitHub 上编辑此页",
    },
    plugins: {
      blog: {
        excerptLength: 0,
      },
      comment: {
        provider: "Waline",
        serverURL: "https://blog-comment.happierx.top",
      },
      components: {
        components: ["VPCard"],
      },
      searchPro: true,
      markdownTab: {
        tabs: true,
      },
      mdEnhance: {
        mark: true,
        mermaid: true,
        component: true,
        demo: true,
      },
      shiki: {
        themes: {
          light: "one-light",
          dark: "one-dark-pro",
        },
      },
    },
    encrypt: {
      config: {
        "/ComputerUsageSkills/科学上网.html": ["404404"],
      },
    },
    contributors: false,
  },
  { custom: true }
);
