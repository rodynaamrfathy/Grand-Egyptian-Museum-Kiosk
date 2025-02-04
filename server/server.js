require('dotenv').config();  // Add this line to load the .env file

const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import CORS

const app = express();

// Access the values from .env file
const port = process.env.PORT || 3000; // Default to 3000 if not specified in .env
const ip = process.env.IP || "127.0.0.1"; // Default to localhost if not specified

// Enable CORS for all origins
app.use(cors()); // This will allow all origins by default

// Set up multer to store uploaded images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create an endpoint to upload the image
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  // Return the image URL to be used in the QR code
  const imageUrl = `http://${ip}:${port}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Serve the uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
