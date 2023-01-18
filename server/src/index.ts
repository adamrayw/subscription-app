import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {

    const app = express();
    
    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Hello World!",
      });
    });

    app.use("/auth", authRoutes);
    app.listen(8080, () => {
      console.log("Server listening...");
    });
    console.log("Connected to mongodb");

  })
  .catch((error) => {
    console.log(error)
    throw new Error();
  });
