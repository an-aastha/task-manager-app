import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import { verifyToken } from "./middleware/auth.middleware";

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRouter);
app.use("/tasks", taskRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running fine");
});

// ✅ Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    user: (req as any).user,
  });
});

// ✅ Single PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});