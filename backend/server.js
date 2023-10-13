import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import passportConfig from "./lib/passportConfig.js";
import cors from "cors";
import fs from "fs/promises";

import authRoutes from "./routes/authRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
mongoose.connect("mongodb://localhost:27017/jobPortal")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

async function initializeDirectories() {
    try {
        await fs.access("./public");
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir("./public");
        }
      }
    
      try {
        await fs.access("./public/resume");
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir("./public/resume");
        }
      }
    
      try {
        await fs.access("./public/profile");
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir("./public/profile");
        }
      }
}
  
initializeDirectories();

const app = express();
const port = 4442;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

app.use("/auth", authRoutes);
app.use("/down",downloadRoutes);
app.use("/up",uploadRoutes);
app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

