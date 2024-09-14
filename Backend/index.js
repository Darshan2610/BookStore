import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import exp from "constants";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 4000;
const mongodbURL = process.env.mongodbURL;

// connect to mongodb
try {
  mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  });
  console.log("connected to mongodb");
} catch (error) {
  console.log("error", error);
}

//defining routes

app.use("/book", bookRoute);
app.use("/user", userRoute);

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "Frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
