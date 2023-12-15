import express from "express";
import { registerUser } from "../controller/userController";

//Router Obj
const router = express.Router();

//***** Create routes */
//Register
router.post("/register", registerUser);

//Export
export default router;
