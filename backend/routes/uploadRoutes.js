
// https://www.youtube.com/watch?v=7BnTHapJmD0&t=378s
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parentDirectory = path.resolve(__dirname, "..");
const uploadsDirectory = path.resolve(parentDirectory, "public");


// Modify the storage configuration to check for file extension
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadsDirectory, "resume"));
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      // If the file extension is not "pdf", handle it as an error
      const error = new Error("Resume must be a PDF");
      error.code = "INVALID_FILE_TYPE";
      return cb(error);
    }
    cb(null, file.fieldname + "-" + Date.now() + ".pdf");
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadsDirectory, "profile"));
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    if (fileExtension !== "jpg" && fileExtension !== "jpeg" && fileExtension !== "png") {
      // If the file extension is not one of the allowed image types, handle it as an error
      const error = new Error("Profile picture must be a JPG, JPEG, or PNG");
      error.code = "INVALID_FILE_TYPE";
      return cb(error);
    }
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit for resume
}).single("file");

const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 5 MB file size limit for profile picture
}).single("file");

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err.code === "INVALID_FILE_TYPE") {
    // Handle the error when the file is not a PDF
    res.status(400).json({ error: err.message });
  } else if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res.status(400).json({ error: "File upload error" });
  } else if (err) {
    // An unknown error occurred.
    res.status(500).json({ error: "Internal server error" });
  } else {
    // No error occurred, proceed to the next middleware.
    next();
  }
};

// Add your router to the app
app.use("/", router);

// Define your route on the router
router.post("/resume", (req, res) => {
  console.log(req.file);
  uploadResume(req, res, (err) => {
    if (err) {
      // Handle Multer errors and the file extension error using the error handling middleware
      //console.log(err);
      handleMulterError(err, req, res);
    } else {
      // File uploaded successfully
      res.send({
        message: "Resume uploaded successfully"
      });
    }
  });
});

router.post("/profile", (req, res) => {
  console.log(req.file);
  uploadProfile(req, res, (err) => {
    if (err) {
      // Handle Multer errors and the file extension error using the error handling middleware
      console.log(err);
      handleMulterError(err, req, res);
    } else {
      // Profile picture uploaded successfully
      res.send({
        message: "Profile picture uploaded successfully"
      });
    }
  });
});

export default app;