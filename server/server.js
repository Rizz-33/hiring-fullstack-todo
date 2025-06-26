import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./configs/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("[full-stack todo] server is ready!");
});

app.listen(5000, () => {
  connectDB();
  console.log("server is running at http://localhost:5000");
});
