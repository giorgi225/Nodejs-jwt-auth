import mongoose from "mongoose";
// import { mongoOptions, mongoURL } from "./config/db.config.js";
import { dbConfig } from "./imports.js";
const connectMongoDB = async () => {
  await mongoose
    .connect(dbConfig.mongoURL, dbConfig.mongoOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

export default connectMongoDB;
