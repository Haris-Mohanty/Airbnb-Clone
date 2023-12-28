import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import download from "image-downloader";
import { v4 as uuidv4 } from "uuid";
import { upload } from "../middleware/imageMiddleware.js";

const __filename = fileURLToPath(import.meta.url); //Found url
const __dirname = dirname(__filename); //Directory name find

//***************** PHOTO UPLOAD BY LINK **************/
export const imageUploadByLink = async (req, res, next) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    const destinationPath = join(__dirname, "..", "uploads", newName);

    const options = {
      url: link,
      dest: destinationPath,
    };

    await download.image(options);

    return res.status(200).json({
      message: "Image uploaded successfully",
      newName,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//***************** PHOTO UPLOAD FROM DEVICE **************/
//DiskStorage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); //file destination
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = uuidv4();
//     cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg"); //file name
//   },
// });
// const upload = multer({ storage: storage });

// //Middleware
export const uploadPhotoFromDevice = upload.array("photos", 100);

//Upload function
export const handleUploadedFiles = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded.",
      });
    }

    const uploadedFiles = req.files.map((file) => file.filename);

    return res.status(200).json({
      message: "Images uploaded successfully",
      uploadedFiles,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
