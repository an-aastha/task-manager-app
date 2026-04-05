"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  taskTitle: string;
  description: string;
  status: string;
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch("https://task-manager-app-scsx.onrender.com/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } else {
    localStorage.clear();
    window.location.href = "/login";
  }
};

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [userEmail, setUserEmail] = useState("");

  // ✅ SAFE USER LOAD (no warning)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserEmail(parsed.email);
    }
  }, []);

  const fetchTasks = async () => {
    let token = localStorage.getItem("accessToken");

    let url = `https://task-manager-app-scsx.onrender.com/tasks?page=1&limit=10`;

    if (search) url += `&search=${search}`;
    if (status) url += `&status=${status}`;

    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      token = await refreshAccessToken();

      res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const data = await res.json();

    if (data.success) {
      setTasks(data.data);
    }
  };

  // ✅ FIXED (no warning now)
  useEffect(() => {
    const load = async () => {
      await fetchTasks();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = async () => {
    let token = localStorage.getItem("accessToken");

    let res = await fetch("https://task-manager-app-scsx.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskTitle: title,
        description: desc,
      }),
    });

    if (res.status === 401) {
      token = await refreshAccessToken();

      res = await fetch("https://task-manager-app-scsx.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskTitle: title,
          description: desc,
        }),
      });
    }

    const data = await res.json();

    if (data.success) {
      setTitle("");
      setDesc("");
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("accessToken");

    await fetch(`https://task-manager-app-scsx.onrender.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const toggleTask = async (id: string) => {
    const token = localStorage.getItem("accessToken");

    await fetch(`https://task-manager-app-scsx.onrender.com/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const updateTaskHandler = async (id: string) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`https://task-manager-app-scsx.onrender.com/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskTitle: editTitle,
        description: editDesc,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setEditingId(null);
      fetchTasks();
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks 🚀</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">{userEmail}</span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          onClick={fetchTasks}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply
        </button>
      </div>

      {/* ADD TASK */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Task</h2>

        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {editingId === task.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-1 border mb-2"
                />

                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-1 border mb-2"
                />

                <button
                  onClick={() => updateTaskHandler(task.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  {task.taskTitle}
                </h2>

                <p className="text-gray-600 mb-3">
                  {task.description}
                </p>
              </>
            )}

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status}
            </span>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Toggle
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditTitle(task.taskTitle);
                  setEditDesc(task.description);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}