import express from "express";
import { addNewPlace } from "../controller/placeController.js";

//Router Obj
const router = express.Router();

//Add New Place
router.post("/add-new-place", addNewPlace);

//Export
export default router;
