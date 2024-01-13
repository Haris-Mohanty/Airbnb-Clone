import jwt from "jsonwebtoken";
import PlaceModel from "../model/PlaceModel.js";

//************* ADD NEW PLACE *****************/
export const addNewPlace = async (req, res, next) => {
  try {
    const {
      title,
      address,
      addedPhotos,
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
      !description ||
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
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      userId = decode.userId;
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token!",
      });
    }

    //Add new place
    let newPlace = new PlaceModel({
      owner: userId,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    await newPlace.save();

    return res.status(201).json({
      message: "Place Created Successfully!",
      newPlace,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//****************** GET ALL ADDED PLACES ********************** /
export const addedPlaces = async (req, res, next) => {
  try {
    //Get Token || Token validation
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided.",
      });
    }

    //Verify Token and Get User ID
    let userId;
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      userId = decode.userId;
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token!",
      });
    }

    const addedPlace = await PlaceModel.find({ owner: userId });

    if (addedPlaces.length === 0) {
      return res.status(404).json({
        message: "No places found for the user.",
      });
    }

    return res.status(200).json({
      addedPlace,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//****************** GET PLACES BY ID ********************** /
export const getPlacesById = async (req, res, next) => {
  try {
    
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
