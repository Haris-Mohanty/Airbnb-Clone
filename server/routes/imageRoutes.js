import express from "express";
import { imageUploadByLink } from "../controller/imageController.js";

//Rest Obj
const router = express.Router();

//Upload image route
router.post("/upload-by-link", imageUploadByLink);

//Export
export default router;
