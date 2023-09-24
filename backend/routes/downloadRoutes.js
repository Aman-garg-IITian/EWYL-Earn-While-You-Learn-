import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

router.get("/resume/:file", async (req, res) => {
  const address = path.join(__dirname, `../public/resume/${req.params.file}`);
  try {
    await fs.access(address, fs.F_OK);
    res.sendFile(address);
  } catch (err) {
    res.status(404).json({
      message: "File not found",
    });
  }
});

router.get("/profile/:file", async (req, res) => {
  const address = path.join(__dirname, `../public/profile/${req.params.file}`);
  try {
    await fs.access(address, fs.F_OK);
    res.sendFile(address);
  } catch (err) {
    res.status(404).json({
      message: "File not found",
    });
  }
});

export default router;


