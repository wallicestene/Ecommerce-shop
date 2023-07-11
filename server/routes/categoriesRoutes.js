const express = require("express")
const { getAllCategories, addCategory } = require("../controllers/categoriesController")

const router = express.Router()

router.get("/products/categories", getAllCategories)
router.post("/products/categories", addCategory)


module.exports = router