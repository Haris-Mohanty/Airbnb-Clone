// import PlaceModel from "../model/PlaceModel.js";

import jwt from "jsonwebtoken";

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

    //Get Token || Token validation
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided.",
      });
    }

    //Verify Token and Get User ID
    let userId;
    

    console.log(userId);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
