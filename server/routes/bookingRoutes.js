import express from "express";
import {
  bookingPlace,
  getBookingOfUser,
  getBookingDetails,
} from "../controller/bookingController.js";

//Router Obj
const router = express.Router();

//Booking Place
router.post("/bookings", bookingPlace);

// Get all booking of user (By User Id)
router.get("/getBookings", getBookingOfUser);

//Get booking details (By Booking Id)
router.get("/getBooking/:id", getBookingDetails);

//Export
export default router;
