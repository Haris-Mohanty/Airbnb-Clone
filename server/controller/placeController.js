import jwt from "jsonwebtoken";
import PlaceModel from "../model/PlaceModel.js";
import mongoose from "mongoose";

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
      price,
    } = req.body;

    //Validation
    if (
      !title ||
      !address ||
      !description ||
      !extraInfo ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !price
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
      price,
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
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID!",
      });
    }

    //Get place
    const place = await PlaceModel.findById(id);
    if (!place) {
      return res.status(404).json({
        message: "Place not found",
      });
    }

    //Res message
    return res.status(200).json({
      place,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//****************** UPDATE PLACES ********************** /
export const updatePlace = async (req, res, next) => {
  try {
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    //Validation
    if (
      !title ||
      !address ||
      !description ||
      !extraInfo ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !price
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
    const placeDocument = await PlaceModel.findById(id);

    //User id match
    if (userId === placeDocument.owner.toString()) {
      //Place Update
      let updatedPlace = placeDocument.set({
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
      await updatedPlace.save();
      return res.status(200).json({
        message: "Place Updated Successfully!",
        updatedPlace,
      });
    } else {
      //user not match
      return res.status(401).json({
        message: "Invalid User!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** GET ALL ADDED PLACES (ADDED BY ALL USER) ******************* /
export const getAllAddedPlaces = async (req, res, next) => {
  try {
    const allPlaces = await PlaceModel.find();
    if (!allPlaces) {
      return res.status(404).json({
        message: "No Places Found!",
      });
    }

    return res.status(200).json({
      allPlaces,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
