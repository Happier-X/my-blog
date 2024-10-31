import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  fullscreen: true,
  hostname: "https://blog.azhf8.top/",
  author: {
    name: "Happier",
    url: "/AboutMe/",
  },
  iconAssets: "//at.alicdn.com/t/c/font_4729614_mavab03i9ch.css",
  iconPrefix: "iconfont icon-",
  logo: "https://zhf-picture.oss-cn-qingdao.aliyuncs.com/picture/logo.jpg",
  repo: "zhf521/MyBlog",
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
      GitHub: "https://github.com/HappierPuppy",
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
      serverURL: "https://blog-comment.azhf8.top",
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
    },
    shiki: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      }
    }
  },
  encrypt: {
    config: {
      "/SoftwareTool/科学上网.html": ["404404"],
    }
  },
  contributors: false,
}, { custom: true });
