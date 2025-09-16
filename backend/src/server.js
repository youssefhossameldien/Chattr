import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
  connectDB();
});
