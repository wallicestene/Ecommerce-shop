const express = require("express")
const { addToCart, getItemsInCart } = require("../controllers/cartController")
const router = express.Router()


router.get("/product/cart", getItemsInCart)

router.post("/product/cart", addToCart)


module.exports = router