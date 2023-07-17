const express = require("express")
const { addToCart, getItemsInCart, deleteItemInCart} = require("../controllers/cartController")
const router = express.Router()


router.get("/product/cart", getItemsInCart)

router.post("/product/cart", addToCart)

router.delete("/product/cart/:id", deleteItemInCart)

module.exports = router