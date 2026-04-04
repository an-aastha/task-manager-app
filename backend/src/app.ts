import express from "express";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());

// routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


import { verifyToken } from "./middleware/auth.middleware";

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    user: (req as any).user,
  });
});


import taskRoutes from "./routes/task.routes";

app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});