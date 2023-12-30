import PlaceModel from "../model/PlaceModel.js";

export const addNewPlace = async (req, res, next) => {
  try {
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    //Validation
    if (
      !title ||
      !address ||
      !photos ||
      !description ||
      !perks ||
      !extraInfo ||
      !checkIn ||
      !checkOut ||
      !maxGuests
    ) {
      return res.status(422).json({
        message: "Please Provide All Fields!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
