import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // 所有内容
    content: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
    // 玩转 NAS
    playNAS: defineCollection({
      type: "page",
      source: "play-nas/*.md",
    }),
    // 三阶魔方盲拧
    cubeBlind: defineCollection({
      type: "page",
      source: "cube-blind/*.md",
    }),
    // 技术分享
    techShare: defineCollection({
      type: "page",
      source: "tech-share/*.md",
    }),
  },
});
