const express = require("express")
const {getAllProducts, getSingleProduct, addProducts, deleteProduct, updateProduct} = require("../controllers/productsControllers") 

const router = express.Router()

router.get("/products", getAllProducts)

router.get("/products/:id", getSingleProduct)

router.post("/products", addProducts)

router.delete("/products/:id", deleteProduct)

router.patch("/products/:id", updateProduct)

module.exports = router

