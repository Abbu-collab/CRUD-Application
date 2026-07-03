require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Ensure public/images directory exists so uploads and static serving won't error
const imagesDir = path.join(__dirname, "public", "images");
try {
  fs.mkdirSync(imagesDir, { recursive: true });
} catch (err) {
  console.error("Failed to create images directory:", err);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/[^a-z0-9.\-\_]/gi, "_");
    cb(null, `${unique}-${safeName}`);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      console.warn("Upload called but no files received");
      return res.status(400).json({ message: "No files uploaded" });
    }

    console.log("Uploaded files:", req.files.map((f) => f.filename));
    const host = req.protocol + "://" + req.get("host");
    const urls = req.files.map((f) => `${host}/images/${f.filename}`);
    return res.status(201).json(urls);
  } catch (err) {
    console.error("Error handling upload:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend server is working! Version 2");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
