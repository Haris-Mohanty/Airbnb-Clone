import express from "express";
import {
  addNewPlace,
  addedPlaces,
  getPlacesById,
} from "../controller/placeController.js";

//Router Obj
const router = express.Router();

//Add New Place
router.post("/add-new-place", addNewPlace);

//Get all addeded places
router.get("/added-places", addedPlaces);

//Get places by ID
router.get("/places/:id", getPlacesById);

//Export
export default router;
