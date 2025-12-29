import { Hono } from "hono";
import type { PrismaClient } from "./generated/prisma/client.js";
import withPrisma from "./lib/prisma.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import { authMiddleware } from "./middleware/auth.js";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
    user?: any;
  };
};

const app = new Hono<ContextWithPrisma>();

const welcomeStrings = [
  "Hello Hono!",
  "To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono",
];

app
  .get("/", (c) => {
    return c.text(welcomeStrings.join("\n\n"));
  })
  // 认证相关路由（不需要认证）
  .route("/auth", authRouter)
  // 文章相关路由
  .route("/posts", postsRouter)
  // 受保护的路由（需要认证）
  .get("/users", authMiddleware, withPrisma, async (c) => {
    const prisma = c.get("prisma");
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // 不返回密码
      },
    });
    return c.json(users);
  })
  // 获取当前登录用户信息
  .get("/me", authMiddleware, withPrisma, async (c) => {
    const user = c.get("user");
    const prisma = c.get("prisma");

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(userData);
  });

export default app;
