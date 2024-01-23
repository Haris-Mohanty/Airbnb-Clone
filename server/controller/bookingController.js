import BookingModel from "../model/BookingModel.js";

//************* ADD NEW BOOKING *****************/
export const bookingPlace = async (req, res, next) => {
  try {
    const {
      place,
      user,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      price,
    } = req.body;

    // Validation
    if (
      !place ||
      !user ||
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

    // Booking
    const booking = new BookingModel(req.body);
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
