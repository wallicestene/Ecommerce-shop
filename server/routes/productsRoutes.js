const express = require("express")
const {getAllProducts, getSingleProduct} = require("../controllers/productsControllers") 

const router = express.Router()

router.get("/products", getAllProducts)

router.get("/products/:id", getSingleProduct)

module.exports = router

