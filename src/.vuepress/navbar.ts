import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文章",
    icon: "Article",
    link: "/article/",
  },
  {
    text: "分类",
    icon: "Category",
    link: "/category/",
  },
  {
    text: "标签",
    icon: "Tag",
    link: "/tag/",
  },
  {
    text: "合集",
    icon: "Collection",
    children: [
      {
        text: "开发",
        children: [
          "/DevelopmentSkills/",
          "/NestStudyNotes/",
          "/VueStudyNotes/",
          "/VueRouterStudyNotes/",
          "/PiniaStudyNotes/",
          "/TypeScriptStudyNotes/",
          "/STM32StudyNotes/",
          "/ElectronStudyNotes/",
          "/ThreeJsStudyNotes/",
          "/RustStudyNotes/",
        ],
      },
      {
        text: "工具使用",
        children: ["/ComputerUsageSkills/", "/PlayNAS/"],
      },
      {
        text: "博客写作",
        children: ["/WritingSkills/"],
      },
      {
        text: "魔方",
        children: ["/3x3x3/", "/3x3x3BLD/"],
      },
      {
        text: "摄影",
        children: ["/PhotographyStudyNotes/"],
      },
      {
        text: "旅行",
        children: ["/TravelRecord/"],
      },
      {
        text: "碎碎念",
        children: ["/ThoughtsAfterReading/"],
      },
    ],
  },
  {
    text: "时间线",
    icon: "TimeLine",
    link: "/timeline/",
  },
  {
    text: "关于我",
    icon: "AboutMe",
    link: "/AboutMe/",
  },
  {
    text: "友链",
    icon: "FriendLink",
    link: "/FriendLink/",
  },
]);
