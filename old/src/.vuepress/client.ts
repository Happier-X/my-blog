import { defineClientConfig } from "vuepress/client";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";

export default defineClientConfig({
  setup() {
    setupSnowFall();
  },
});