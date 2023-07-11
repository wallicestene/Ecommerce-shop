const express = require("express")
const { getAllCategories, addCategory } = require("../controllers/categoriesController")

const router = express.Router()

router.get("/product/categories", getAllCategories)

router.post("/product/categories", addCategory)


module.exports = router