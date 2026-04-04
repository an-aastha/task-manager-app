import express from "express";
import { createTaskHandler, deleteTaskHandler, getTasksHandler, updateTaskHandler } from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createTaskHandler);

export default router;

router.get("/", verifyToken, getTasksHandler);

router.put("/:id", verifyToken, updateTaskHandler);

router.delete("/:id", verifyToken, deleteTaskHandler);