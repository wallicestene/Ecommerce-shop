const express = require("express")
const { addToCart, getItemsInCart, deleteItemInCart} = require("../controllers/cartController")
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()

//  require Auth for all cart routes
// router.use(requireAuth)

router.get("/product/cart", getItemsInCart)

router.post("/product/cart", addToCart)

router.delete("/product/cart/:id", deleteItemInCart)

module.exports = router