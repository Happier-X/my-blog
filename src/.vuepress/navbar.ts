import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "文章",
    icon: "book",
    link: "/article/",
  },
  {
    text: "分类",
    icon: "folder",
    link: "/category/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/"
  },
  {
    text: "合集",
    icon: "box",
    children: [
      {
        text: "软件开发",
        children: [
          "/DevelopmentSkills/",
          "/GoLearningNote/",
          "/NestLearningNote/",
          "/VueLearningNote/",
          "/VueRouterLearningNote/",
          "/PiniaLearningNote/",
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
          "/PhotographyLearningNote/"
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
          "/STM32LearningNote/"
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
    icon: "clock",
    link: "/timeline/",
  },
  {
    text: "关于我",
    icon: "user",
    link: "/AboutMe/",
  },
  {
    text: "友链",
    icon: "link",
    link: "/FriendLink/",
  },
]);
