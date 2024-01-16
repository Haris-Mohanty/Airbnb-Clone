import express from "express";
import {
  addNewPlace,
  addedPlaces,
  getPlacesById,
  updatePlace,
  getAllAddedPlaces,
} from "../controller/placeController.js";

//Router Obj
const router = express.Router();

//Add New Place
router.post("/add-new-place", addNewPlace);

//Get all addeded places (By User)
router.get("/added-places", addedPlaces);

//Get places by ID (By Place ID)
router.get("/places/:id", getPlacesById);

//Update Place
router.put("/updatePlace", updatePlace);

//Get all added Places (Home page)
router.get("/all-added-places", getAllAddedPlaces);

//Export
export default router;
