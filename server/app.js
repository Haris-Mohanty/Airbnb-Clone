import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

//********** UPLOAD IMAGE (FIND DIRECTORY) *******/
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//********* DOTENV CONFIGURATION *****/
dotenv.config();

//****** DATABASE CONFIG *****/
connectDB();

//********* REST OBJECT ********/
const app = express();

//********* MIDDLEWARE **********/
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//********* MIDDLEWARE ROUTES **********/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/image", imageRoutes);

//********* PORTS AND LISTEN **********/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
