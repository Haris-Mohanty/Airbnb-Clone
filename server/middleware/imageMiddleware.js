import multer from "multer";
import { v4 as uuidv4 } from "uuid";

//Disk storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

//Only image accept
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."));
  }
};

//Set Limits
const limits = {
  fileSize: 1024 * 1024 * 3, // 3 MB limit
};

//Export
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});
