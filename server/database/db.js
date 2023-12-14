import mongoose from "mongoose";

const connectDB = async () => {
  try {
  } catch (err) {
    console.log(`MongoDb Database Error ${err}.`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDB;
