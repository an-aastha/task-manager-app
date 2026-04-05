import express from "express";
import { registerHandler, loginHandler, logoutHandler, refreshHandler } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = express.Router();

// register route
authRouter.post("/register", registerHandler);

// login route
authRouter.post("/login", loginHandler);

authRouter.post("/refresh", refreshHandler);
authRouter.post("/logout", verifyToken, logoutHandler);

export default authRouter;