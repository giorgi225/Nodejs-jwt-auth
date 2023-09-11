import express from "express";
import runServer from "./server.js"; // import runServer function
import connectMongoDB from "./db.js"; // import connectMongoDB function

import { authRoutes, userRoutes } from "./imports.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/auth", authRoutes);
app.use("/user", userRoutes)

connectMongoDB()
  .then(() => {
    runServer(app);
  })
  .catch((err) => {
    console.error(err);
  });
