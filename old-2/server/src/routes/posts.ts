import { Hono } from "hono";
import type { PrismaClient } from "../generated/prisma/client.js";
import withPrisma from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
    user?: any;
  };
};

const postsRouter = new Hono<ContextWithPrisma>();

// 获取文章列表
postsRouter.get("/", withPrisma, async (c) => {
  try {
    const prisma = c.get("prisma");
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.json(posts);
  } catch (error) {
    console.error("Get posts error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 获取单篇文章
postsRouter.get("/:id", withPrisma, async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    const prisma = c.get("prisma");
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 创建文章（需要认证）
postsRouter.post("/", authMiddleware, withPrisma, async (c) => {
  try {
    const body = await c.req.json();
    const { title, content } = body;

    // 验证输入
    if (!title || title.trim().length === 0) {
      return c.json({ error: "Title is required" }, 400);
    }

    const prisma = c.get("prisma");
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content || null,
      },
    });

    return c.json({
      message: "Post created successfully",
      post,
    }, 201);
  } catch (error) {
    console.error("Create post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 更新文章（需要认证）
postsRouter.put("/:id", authMiddleware, withPrisma, async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    const body = await c.req.json();
    const { title, content } = body;

    const prisma = c.get("prisma");

    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return c.json({ error: "Post not found" }, 404);
    }

    // 准备更新数据
    const updateData: any = {};
    if (title !== undefined) {
      if (title.trim().length === 0) {
        return c.json({ error: "Title cannot be empty" }, 400);
      }
      updateData.title = title.trim();
    }
    if (content !== undefined) {
      updateData.content = content || null;
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return c.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Update post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 删除文章（需要认证）
postsRouter.delete("/:id", authMiddleware, withPrisma, async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    const prisma = c.get("prisma");

    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return c.json({ error: "Post not found" }, 404);
    }

    await prisma.post.delete({
      where: { id },
    });

    return c.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default postsRouter;