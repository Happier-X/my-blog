import type { Context, Next } from "hono";
import { verifyToken, type JWTPayload } from "../lib/auth.js";

// 扩展 Context 类型，添加 user 属性
export type ContextWithUser = {
  Variables: {
    user: JWTPayload;
    prisma: any;
  };
};

// JWT 认证中间件
export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized: Missing or invalid token" }, 401);
  }

  const token = authHeader.substring(7); // 移除 "Bearer " 前缀
  const payload = verifyToken(token);

  if (!payload) {
    return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }

  // 将用户信息存储在上下文中
  c.set("user", payload);
  await next();
}