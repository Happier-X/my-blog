import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { cut } from "nodejs-jieba";

export default hopeTheme(
  {
    hotReload: true,
    fullscreen: true,
    hostname: "https://blog.happierx.top/",
    author: {
      name: "Happier",
      url: "/AboutMe/",
    },
    logo: "https://happier-blog.oss-cn-qingdao.aliyuncs.com/assets/logo.jpg",
    repoDisplay: true,
    repo: "https://github.com/Happier-X/my-blog",
    docsDir: "src",
    navbar,
    sidebar,
    sidebarSorter: ["readme", "order", "date-desc"],
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
      icon: {
        assets: "//at.alicdn.com/t/c/font_4729614_6gl9dhn0nkc.css",
        prefix: "iconfont icon-",
      },
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
      slimsearch: {
        indexContent: true,
        indexOptions: {
          tokenize: (text, fieldName) =>
            fieldName === "id" ? [text] : cut(text, true),
        },
      },
    },
    markdown: {
      tabs: true,
      highlighter: {
        type: "shiki",
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
