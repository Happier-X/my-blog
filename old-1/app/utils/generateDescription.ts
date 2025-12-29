import type { ContentFile } from "@nuxt/content";

/**
 * 生成文章的描述
 * 如果配置了 AI API，将使用 AI 生成描述
 * 否则使用文章的第一行作为描述
 */
export async function generateDescription(content: string): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const apiBaseUrl = process.env.AI_API_BASE_URL;
  const model = process.env.AI_MODEL;
  try {
    // 调用 AI API 生成描述
    const description = await callAIAPI(apiBaseUrl, apiKey, model, content);
    return description || "";
  } catch (error) {
    console.error("生成描述失败，使用默认方式:", error);
    return "";
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
 * 调用 AI API 生成描述
 */
async function callAIAPI(
  baseUrl: string,
  apiKey: string,
  model: string,
  content: string
): Promise<string | null> {
  // 设置 8 秒超时，适应 Vercel Serverless Function 限制
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error("AI API 调用超时（8秒）");
    } else {
      console.error("调用 AI API 失败:", error);
    }
    return null;
  }
}
