import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5100;
const _dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messagesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
