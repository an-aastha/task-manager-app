import { Request, Response } from "express";
import { createUserAccount, loginUser } from "../services/auth.service";

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
        token: result.token,
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