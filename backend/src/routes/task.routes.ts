import express from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  toggleTaskHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, createTaskHandler);
router.get("/", verifyToken, getTasksHandler);
router.patch("/:id", verifyToken, updateTaskHandler); // ✅ fixed
router.delete("/:id", verifyToken, deleteTaskHandler);
router.patch("/:id/toggle", verifyToken, toggleTaskHandler);

export default router;