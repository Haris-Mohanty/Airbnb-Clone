import express from "express";
import { bookingPlace } from "../controller/bookingController.js";

//Router Obj
const router = express.Router();

//Booking Place
router.post("/booking", bookingPlace);

//Export
export default router;
