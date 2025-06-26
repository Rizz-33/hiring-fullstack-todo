import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./configs/db.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("server is running at http://localhost:5000");
});
