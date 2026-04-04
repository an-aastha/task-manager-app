import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const createTask = async (userId: string, title: string, description?: string) => {
  const task = await db.task.create({
    data: {
      taskTitle: title,
      description,
      userId,
    },
  });

  return task;
};

export const getUserTasks = async (userId: string) => {
  const tasks = await db.task.findMany({
    where: { userId },
    orderBy: { createdOn: "desc" },
  });

  return tasks;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: any
) => {
  // First check if task belongs to user
  const existingTask = await db.task.findFirst({
    where: {
      id: taskId,
      userId: userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found or unauthorized");
  }

  // Now update
  const updatedTask = await db.task.update({
    where: {
      id: taskId,
    },
    data,
  });

  return updatedTask;
};

export const deleteTask = async (taskId: string, userId: string) => {
  // check ownership first
  const existingTask = await db.task.findFirst({
    where: {
      id: taskId,
      userId: userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found or unauthorized");
  }

  const deletedTask = await db.task.delete({
    where: {
      id: taskId,
    },
  });

  return deletedTask;
};