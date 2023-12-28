import express from "express";
import {
  imageUploadByLink,
  handleUploadedFiles,
  uploadPhotoFromDevice,
} from "../controller/imageController.js";

//Rest Obj
const router = express.Router();

//Upload image by link route
router.post("/upload-by-link", imageUploadByLink);

//Upload photo from device
router.post("/upload", uploadPhotoFromDevice, handleUploadedFiles);

//Export
export default router;
