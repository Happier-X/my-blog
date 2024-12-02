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
    link: "/tag/"
  },
  {
    text: "合集",
    icon: "Collection",
    children: [
      {
        text: "软件开发",
        children: [
          "/DevelopmentSkills/",
          "/GoStudyNotes/",
          "/NestStudyNotes/",
          "/VueStudyNotes/",
          "/VueRouterStudyNotes/",
          "/PiniaStudyNotes/",
          "/TypeScriptStudyNotes/"
        ],
      },
      {
        text: "软件工具",
        children: [
          "/SoftwareTool/",
        ]
      },
      {
        text: "魔方",
        children: [
          "/3x3x3/",
          "/3x3x3BLD/"
        ]
      },
      {
        text: "摄影",
        children: [
          "/PhotographyStudyNotes/"
        ]
      },
      {
        text: "旅行",
        children: [
          "/TravelRecord/"
        ]
      },
      {
        text: "嵌入式开发",
        children: [
          "/STM32StudyNotes/"
        ]
      },
      {
        text: "碎碎念",
        children: [
          "/ThoughtsAfterReading/"
        ]
      }
    ]
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
