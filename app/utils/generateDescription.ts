import type { ContentFile } from "@nuxt/content";

/**
 * 生成文章的描述
 * 如果配置了 AI API，将使用 AI 生成描述
 * 否则使用文章的第一行作为描述
 */
export async function generateDescription(file: ContentFile): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const apiBaseUrl = process.env.AI_API_BASE_URL;
  const model = process.env.AI_MODEL;

  // 如果没有配置 API，使用默认方式
  if (!apiKey || !apiBaseUrl) {
    return getDefaultDescription(file);
  }

  try {
    // 提取文章内容用于生成描述
    const content = extractContent(file);
    if (!content || content.length < 50) {
      return getDefaultDescription(file);
    }

    // 调用 AI API 生成描述
    const description = await callAIAPI(apiBaseUrl, apiKey, model, content);
    return description || getDefaultDescription(file);
  } catch (error) {
    console.error("生成描述失败，使用默认方式:", error);
    return getDefaultDescription(file);
  }
}

/**
 * 获取默认描述（文章的第一行）
 */
function getDefaultDescription(file: ContentFile): string {
  const text = typeof file.body === "string" ? file.body : "";
  return text.split("\n")[0] || "";
}

/**
 * 提取文章内容
 */
function extractContent(file: ContentFile): string {
  let content = "";

  // 优先使用 body 内容
  if (typeof file.body === "string") {
    content = file.body;
  } else if (file.body && typeof file.body === "object") {
    // 如果 body 是对象，尝试提取文本
    content = JSON.stringify(file.body);
  }

  return content;
}

/**
 * 调用 AI API 生成描述
 */
async function callAIAPI(
  baseUrl: string,
  apiKey: string,
  model: string,
  content: string
): Promise<string | null> {
  try {
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "你是一个专业的内容总结助手。请为给定的文章内容生成一个简洁、准确的描述，长度在100-150个字符之间。描述应该概括文章的主要内容和核心观点。",
          },
          {
            role: "user",
            content: `请为以下文章生成一个描述：\n\n${content}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      console.error(
        `AI API 返回错误: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim();

    return description || null;
  } catch (error) {
    console.error("调用 AI API 失败:", error);
    return null;
  }
}
