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
