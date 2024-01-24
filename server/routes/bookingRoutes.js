import express from "express";
import {
  bookingPlace,
  getBookingOfUser,
} from "../controller/bookingController.js";

//Router Obj
const router = express.Router();

//Booking Place
router.post("/bookings", bookingPlace);

// Get all booking of user (By User Id)
router.get("/getBookings", getBookingOfUser);

//Export
export default router;
