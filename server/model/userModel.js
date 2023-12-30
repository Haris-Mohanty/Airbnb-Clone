import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
  },
});

export default mongoose.model("User", userSchema);
