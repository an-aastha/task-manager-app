import { Request, Response } from "express";
import { createTask,deleteTask,getUserTasks, updateTask } from "../services/task.service";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const userId = (req as any).user.userId;

    const task = await createTask(userId, title, description);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getTasksHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const tasks = await getUserTasks(userId);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id as string;
    const userId = (req as any).user.userId;

    const updatedTask = await updateTask(taskId, userId, req.body);

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id as string;
    const userId = (req as any).user.userId;

    const deletedTask = await deleteTask(taskId, userId);

    res.status(200).json({
      success: true,
      data: deletedTask,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};