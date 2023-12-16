import express from "express";
import { registerUser } from "../controller/userController.js";

//Router Obj
const router = express.Router();

//***** Create routes */
//Register
router.post("/register", registerUser);

//Login
router.post("/login")

//Export
export default router;
