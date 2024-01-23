import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import multer from "multer";

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
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//********* MIDDLEWARE ROUTES **********/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/place", placeRoutes);
app.use("/api/v1/book", bookingRoutes);

//****** CUSTOM MIDDLEWARE ERROR HANDLE(Image Error Handle) ******/
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer errors (e.g., file size exceeded)
    res.status(400).json({
      message: "Multer error",
      error: err.message,
    });
  } else if (err) {
    // Other unexpected errors
    res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  } else {
    next(); // If no error, proceed to the next middleware or route handler
  }
});

//********* PORTS AND LISTEN **********/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
