import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    // 三阶魔方盲拧
    cubeBlind: defineCollection({
      type: "page",
      source: "cube-blind/*.md",
      schema: z.object({
        readingTime: z.number().optional(),
      }),
    }),
    // 玩转 NAS
    playNAS: defineCollection({
      type: "page",
      source: "play-nas/*.md",
      schema: z.object({
        readingTime: z.number().optional(),
      }),
    }),
    // 技术分享
    techShare: defineCollection({
      type: "page",
      source: "tech-share/*.md",
      schema: z.object({
        readingTime: z.number().optional(),
      }),
    }),
  },
});
