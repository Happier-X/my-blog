import type { ContentFile } from "@nuxt/content";

/**
 * 生成文章的字数统计
 */
export function generateWordCount(file: ContentFile): number {
  const text = extractText(file);
  return countWords(text);
}

/**
 * 提取文章文本内容
 */
function extractText(file: ContentFile): string {
  let text = "";

  // 优先使用 body 内容
  if (typeof file.body === "string") {
    text = file.body;
  } else if (file.body && typeof file.body === "object") {
    // 如果 body 是对象，尝试递归提取文本
    text = extractTextFromObject(file.body);
  }

  return text;
}

/**
 * 从对象中递归提取文本
 */
function extractTextFromObject(obj: any): string {
  let text = "";

  if (typeof obj === "string") {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      text += extractTextFromObject(item) + " ";
    }
  } else if (obj && typeof obj === "object") {
    // 处理常见的内容节点
    if (obj.type === "text" && obj.value) {
      text += obj.value + " ";
    } else if (obj.children) {
      text += extractTextFromObject(obj.children) + " ";
    } else {
      // 递归处理所有属性
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key !== "type") {
          text += extractTextFromObject(obj[key]) + " ";
        }
      }
    }
  }

  return text;
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