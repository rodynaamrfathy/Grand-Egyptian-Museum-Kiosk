const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

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
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Serve the uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

