import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

router.get("/resume/:file", async (req, res) => {
  const address = path.join(__dirname, `../uploads/${req.params.file}`);
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
// pathUtil.js
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// export function getModuleDirname(importMetaUrl) {
//   const __filename = fileURLToPath(importMetaUrl);
//   return dirname(__filename);
// }
// import express from "express";
// import fs from "fs/promises";
// import path from "path";
// import { getModuleDirname } from './pathUtil.js'; // Update the import path

// const router = express.Router();
// const __dirname = getModuleDirname(import.meta.url);

// router.get("/resume/:file", async (req, res) => {
//   const address = path.join(__dirname, `../uploads/${req.params.file}`);
//   try {
//     await fs.access(address, fs.F_OK);
//     res.sendFile(address);
//   } catch (err) {
//     res.status(404).json({
//       message: "File not found",
//     });
//   }
// });

// router.get("/profile/:file", async (req, res) => {
//   const address = path.join(__dirname, `../public/profile/${req.params.file}`);
//   try {
//     await fs.access(address, fs.F_OK);
//     res.sendFile(address);
//   } catch (err) {
//     res.status(404).json({
//       message: "File not found",
//     });
//   }
// });

// export default router;


