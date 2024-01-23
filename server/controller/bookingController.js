import BookingModel from "../model/BookingModel.js";

//************* ADD NEW BOOKING *****************/
export const bookingPlace = async (req, res, next) => {
  try {
    const { place, user, checkIn, checkOut, maxGuests, name, mobile, price } =
      req.body;

    // Validation
    if (
      !place ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !name ||
      !mobile ||
      !price
    ) {
      return res.status(422).json({
        message: "Please Provide All Fields!",
      });
    }

    // Booking
    const booking = new BookingModel({
      place,
      user,
      checkIn,
      checkOut,
      maxGuests,
      name,
      mobile,
      price,
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
