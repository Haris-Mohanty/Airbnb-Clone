import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  loginUserProfile,
} from "../controller/userController.js";

//Router Obj
const router = express.Router();

//***** Create routes */
//Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//Get all user
router.get("/getUser", getUser);

//Get Login user profile
router.get("/profile", loginUserProfile);

//Export
export default router;
