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

export const getUserTasks = async (
  userId: string,
  query: any
) => {
  const { page = 1, limit = 5, status, search } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const tasks = await db.task.findMany({
    where: {
      userId,
      ...(status && { status }),
      ...(search && {
        taskTitle: {
          contains: search,
        },
      }),
    },
    skip,
    take: Number(limit),
    orderBy: {
      createdOn: "desc",
    },
  });

  return tasks;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: any
) => {
  const existingTask = await db.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found or unauthorized");
  }

  const updatedTask = await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      taskTitle: data.taskTitle,
      description: data.description,
    },
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

export const toggleTaskStatus = async (taskId: string, userId: string) => {
  const task = await db.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const newStatus =
    task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  return updatedTask;
};