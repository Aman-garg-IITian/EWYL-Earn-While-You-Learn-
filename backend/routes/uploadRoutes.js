import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";

import { pipeline as pipelineAsync } from "stream/promises";

const router = express.Router();

const upload = multer();

router.post("/resume", upload.single("file"), async (req, res) => {
  const { file } = req;
  if (file.detectedFileExtension !== ".pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    try {
      await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
      );

      res.send({
        message: "File uploaded successfully",
        url: `/host/resume/${filename}`,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error while uploading",
      });
    }
  }
});

router.post("/profile", upload.single("file"), async (req, res) => {
  const { file } = req;
  if (
    file.detectedFileExtension !== ".jpg" &&
    file.detectedFileExtension !== ".png"
  ) {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    try {
      await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
      );

      res.send({
        message: "Profile image uploaded successfully",
        url: `/host/profile/${filename}`,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error while uploading",
      });
    }
  }
});

export default router;
