
const express = require("express");
const { getAllProducts, getSingleProduct, addProducts, deleteProduct, updateProduct, searchAll } = require("../controllers/productsControllers");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Generate a unique filename for each file
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

// Add the upload middleware to the addProducts route
router.post("/products", upload.single("image_url"), addProducts);

// Other routes
router.get("/products/all", searchAll)
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.delete("/products/:id", deleteProduct);
router.patch("/products/:id", updateProduct);

module.exports = router;



