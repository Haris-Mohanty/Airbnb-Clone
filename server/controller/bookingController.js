import jwt from "jsonwebtoken";
import BookingModel from "../model/BookingModel.js";

//************** GET USER ID FROM TOKEN ***********/
const getUserIdFromToken = async (token) => {
  try {
    //Token verify and get user id
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token!",
    });
  }
};

//*************** ADD NEW BOOKING *********************/
export const bookingPlace = async (req, res, next) => {
  try {
    const { place, checkIn, checkOut, numberOfGuests, name, mobile, price } =
      req.body;

    // Validation
    if (
      !place ||
      !checkIn ||
      !checkOut ||
      !numberOfGuests ||
      !name ||
      !mobile ||
      !price
    ) {
      return res.status(422).json({
        message: "Please Provide All Fields!",
      });
    }

    //Get token & Token Validation
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided.",
      });
    }
    //User id get from token
    const userId = await getUserIdFromToken(token);

    // Booking
    const booking = new BookingModel({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price,
      user: userId,
    });
    await booking.save();

    return res.status(201).json({
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* GET ALL BOOKINGS OF USER (BY USER ID) ************/
export const getBookingOfUser = async (req, res, next) => {
  try {
    //Get token & Token Validation
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided.",
      });
    }
    //User id get from token
    const userId = await getUserIdFromToken(token);

    //Get Bookings
    const allBookingsOfUser = await BookingModel.find({
      user: userId,
    }).populate("place");
    if (allBookingsOfUser.length === 0) {
      return res.status(404).json({
        message: "No places found for the user.",
      });
    }

    //Success response
    return res.status(200).json({
      allBookingsOfUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* GET BOOKING DETAILS (BY BOOKING ID) ************/
export const getBookingDetails = async (req, res, nex) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
