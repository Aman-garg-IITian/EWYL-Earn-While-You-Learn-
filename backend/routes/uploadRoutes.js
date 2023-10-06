// import express from "express";
// import multer from "multer";
// import fs from "fs/promises";
// import path from 'path';
//  import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from "uuid";
// import { promisify } from "util";

// // import { pipeline as pipelineAsync } from "stream/promises";
// import { pipeline } from 'stream';
// const router = express.Router();

// const upload = multer();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// router.post("/resume", upload.single("file"), async (req, res) => {
//   const { file } = req;
//   console.log(file); 
//   const fileExtension = file.originalname.split(".").pop().toLowerCase();

//   if (fileExtension !== "pdf") {
// //   if (file.detectedFileExtension !== ".pdf") {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}.pdf`;

//     try {
//       await pipeline(
//         file.stream,
//         fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
//       );
//       await fileHandle.close();
//       res.send({
//         message: "File uploaded successfully",
//         url: `/host/resume/${filename}`,
//       });
//     } catch (err) {
//         console.error("Error during file upload:", err);
//       res.status(400).json({
//          // Log the error
//         message: "Error while uploading",
//       });
//     }
//   }
// });

// router.post("/profile", upload.single("file"), async (req, res) => {
//   const { file } = req;
//   if (
//     file.detectedFileExtension !== ".jpg" &&
//     file.detectedFileExtension !== ".png"
//   ) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.detectedFileExtension}`;

//     try {
//       await pipeline(
//         file.stream,
//         fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
//       );

//       res.send({
//         message: "Profile image uploaded successfully",
//         url: `/host/profile/${filename}`,
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: "Error while uploading",
//       });
//     }
//   }
// });

// export default router;

// import express from "express";
// import multer from "multer";
// import { promises as fsPromises } from "fs";
// import { v4 as uuidv4 } from "uuid";
// import { fileURLToPath } from 'url';
// import path from 'path';
// import { pipeline } from 'stream';

// const router = express.Router();

// const upload = multer();

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// router.post("/resume", upload.single("file"), async (req, res) => {
//   const { file } = req;

//   const fileExtension = file.originalname.split(".").pop().toLowerCase();

//   if (fileExtension !== "pdf") {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}.pdf`;

//     try {
//       // Open the file using fs.promises.open
//       const fileHandle = await fsPromises.open(`${__dirname}/../public/resume/${filename}`, 'w');

//       // Create a pipeline to copy the file stream to the write stream
//       await pipeline(file.stream, fileHandle);

//       // Close the file handle
//       await fileHandle.close();

//       // Read 'readMe.txt' using fs.promises.readFile
//       const fileData = await fsPromises.readFile('readMe.txt', 'utf8');

//       // Write the file data to 'writeMe.txt' using fs.promises.writeFile with a callback function
//     //   fsPromises.writeFile('writeMe.txt', fileData, (err) => {
//     //     if (err) {
//     //       console.error("Error during file write:", err);
//     //     } else {
//     //       console.log("File write successful.");
//     //     }
//     //   });

//       res.send({
//         message: "File uploaded successfully",
//         url: `/host/resume/${filename}`,
//       });
//     } catch (err) {
//       console.error("Error during file upload:", err);
//       res.status(400).json({
//         message: "Error while uploading",
//       });
//     }
//   }
// });

// export default router;




// import express from "express";
// import multer from "multer";
// import fs from "fs/promises";
// import path from 'path';
//  import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from "uuid";
// import { promisify } from "util";

// // import { pipeline as pipelineAsync } from "stream/promises";
// import { pipeline } from 'stream';
// const router = express.Router();

// const upload = multer();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// router.post("/resume", upload.single("file"), async (req, res) => {
//   const { file } = req;
//   console.log(file); 
//   const fileExtension = file.originalname.split(".").pop().toLowerCase();

//   if (fileExtension !== "pdf") {
// //   if (file.detectedFileExtension !== ".pdf") {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}.pdf`;

// import express from "express";
// import multer from "multer";

// const app = express();
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + ".pdf");
//   },
// });

// const upload = multer({ storage }).single("file");

// // Add your router to the app
// app.use("/", router);

// // Define your route on the router
// router.post("/resume", upload, (req, resp) => {
//   resp.send("file uploaded");
// });

// export default app;
// https://www.youtube.com/watch?v=7BnTHapJmD0&t=378s
import express from "express";
import multer from "multer";

const app = express();
const router = express.Router();

// Modify the storage configuration to check for file extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      // If the file extension is not "pdf", handle it as an error
      const error = new Error("File must be a PDF");
      error.code = "INVALID_FILE_TYPE";
      return cb(error);
    }
    cb(null, file.fieldname + "-" + Date.now() + ".pdf");
  },
});

const upload = multer({ storage }).single("file");

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err.code === "INVALID_FILE_TYPE") {
    // Handle the error when the file is not a PDF
    res.status(400).json({ error: "File must be a PDF" });
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
  upload(req, res, (err) => {
    if (err) {
      // Handle Multer errors and the file extension error using the error handling middleware
      handleMulterError(err, req, res);
    } else {
      // File uploaded successfully
      res.send("File uploaded");
    }
  });
});

export default app;