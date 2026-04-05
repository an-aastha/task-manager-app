"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Task Manager 🚀
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        Manage your tasks efficiently with authentication, filtering, and more.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}