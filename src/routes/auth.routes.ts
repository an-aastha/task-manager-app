import express from "express";
import { registerHandler, loginHandler } from "../controllers/auth.controller";

const authRouter = express.Router();

// register route
authRouter.post("/register", registerHandler);

// ✅ ADD THIS
authRouter.post("/login", loginHandler);

export default authRouter;