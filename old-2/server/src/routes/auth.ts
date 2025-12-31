import { Hono } from "hono";
import type { PrismaClient } from "../generated/prisma/client.js";
import { hashPassword, verifyPassword, generateToken } from "../lib/auth.js";
import withPrisma from "../lib/prisma.js";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const authRouter = new Hono<ContextWithPrisma>();

// 注册接口
authRouter.post("/register", withPrisma, async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    // 验证输入
    if (!username || !password) {
      return c.json({ error: "Username and password are required" }, 400);
    }

    if (username.length < 3) {
      return c.json({ error: "Username must be at least 3 characters" }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    }

    const prisma = c.get("prisma");

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return c.json({ error: "Username already exists" }, 409);
    }

    // 加密密码并创建用户
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // 生成 JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    // 返回用户信息（不包含密码）
    return c.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    }, 201);
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// 登录接口
authRouter.post("/login", withPrisma, async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    // 验证输入
    if (!username || !password) {
      return c.json({ error: "Username and password are required" }, 400);
    }

    const prisma = c.get("prisma");

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return c.json({ error: "Invalid username or password" }, 401);
    }

    // 验证密码
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: "Invalid username or password" }, 401);
    }

    // 生成 JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    // 返回用户信息（不包含密码）
    return c.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default authRouter;