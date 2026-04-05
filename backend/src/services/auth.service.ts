import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const createUserAccount = async (email: string, password: string) => {
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Access Token (short-lived)
  const accessToken = jwt.sign(
    { userId: user.id },
    "access_secret",
    { expiresIn: "15m" }
  );

  // Refresh Token (long-lived)
  const refreshToken = jwt.sign(
    { userId: user.id },
    "refresh_secret",
    { expiresIn: "7d" }
  );

  // Save refresh token in DB
  await db.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("No refresh token provided");
  }

  const decoded: any = jwt.verify(token, "refresh_secret");

  const user = await db.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || user.refreshToken !== token) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = jwt.sign(
    { userId: user.id },
    "access_secret",
    { expiresIn: "15m" }
  );

  return newAccessToken;
};

export const logoutUser = async (userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};