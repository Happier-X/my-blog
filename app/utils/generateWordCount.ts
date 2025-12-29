import type { ContentFile } from "@nuxt/content";

/**
 * 生成文章的字数统计
 */
export function generateWordCount(content: string): number {
  return countWords(content);
}

/**
 * 统计字数（支持中英文混合）
 * 中文按字符计算，英文按单词计算
 */
function countWords(text: string): number {
  if (!text) {
    return 0;
  }

  // 移除 Markdown 语法
  text = text
    .replace(/```[\s\S]*?```/g, "") // 移除代码块
    .replace(/`[^`]*`/g, "") // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, "") // 移除图片
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // 保留链接文本
    .replace(/#+\s/g, "") // 移除标题标记
    .replace(/[*_~]/g, "") // 移除强调标记
    .replace(/^\s*[-*+]\s/gm, "") // 移除列表标记
    .replace(/^\s*\d+\.\s/gm, ""); // 移除有序列表标记

  // 统计中文字符数
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
  const chineseCount = chineseChars.length;

  // 移除中文字符后统计英文单词
  const englishText = text.replace(/[\u4e00-\u9fa5]/g, " ");
  const englishWords = englishText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0 && /[a-zA-Z0-9]/.test(word));
  const englishCount = englishWords.length;

  // 返回总字数
  return chineseCount + englishCount;
}
