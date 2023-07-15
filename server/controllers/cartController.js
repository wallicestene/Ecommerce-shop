const CartItem = require("../models/cartModel");
const mongoose = require("mongoose");

// addToCart
const addToCart = (req, res) => {
  const { item, quantity } = req.body;
  CartItem.create({ item, quantity })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ error: "Error in adding a product to cart collection" });
    });
};

const getItemsInCart = (req,res) => {
    CartItem.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err.message)
        res.status(404).json({message: "Error getting the cart items"})
    })
}

module.exports = {
    addToCart,
    getItemsInCart,
}
