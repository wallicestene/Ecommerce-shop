const express = require("express")
const { getAllCategories, addCategory } = require("../controllers/categoriesController")
const multer = require("multer");
const path = require("path");

const router = express.Router()

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


router.get("/product/categories", getAllCategories)

router.post("/product/categories", upload.single("image_url"), addCategory)


module.exports = router