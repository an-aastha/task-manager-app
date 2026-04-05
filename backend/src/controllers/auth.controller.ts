import { Request, Response } from "express";
import { createUserAccount, loginUser, refreshAccessToken, logoutUser } from "../services/auth.service";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const newUser = await createUserAccount(email, password);

    // Remove password safely
    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: safeUser,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    // remove password from user before sending
    const { password: _, ...safeUser } = result.user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: safeUser,
      },
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const refreshHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const accessToken = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};


export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    await logoutUser(userId);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};