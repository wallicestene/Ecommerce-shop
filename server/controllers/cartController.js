const mongoose = require("mongoose");
const { changeStream, CartItem } = require("../models/cartModel"); // Import the change stream from the cartModel file

// addToCart
const addToCart = (req, res) => {
  const { item, quantity} = req.body;
  const userId = req.user._id
  console.log(userId);
  // cheking if the item already exists
  CartItem.findOne({ item: item })
    .then((existingCartItem) => {
      if (!existingCartItem) {
        CartItem.create({ item, quantity, userId }).then((result) => {
          // Emitting the 'dataChange' event to notify clients about the new item in the cart
          const change = { type: "cartItemAdded", cartItem: result };
          changeStream.emit("dataChange", change);
          res.status(200).json(result);
        });
      }else{
        throw new Error("Item already added to Cart!")
      }

    })
    .catch((err) => {
      console.log(err.message);
      res.json({ error: "Error in adding a product to cart collection" });
    });
};

// get All items in cart
// TODO query the items according to the user signed in
const getItemsInCart = (req, res) => {
  // const userId = req.user._id
  CartItem.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(404).json({ message: "Error getting the cart items" });
    });
};

const deleteItemInCart = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Item in cart" });
  }
  CartItem.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "No Such Item in cart" });
      } else {
        // Emitting the 'dataChange' event to notify clients about the item deletion
        const change = { type: "cartItemDeleted", cartItem: result };
        changeStream.emit("dataChange", change);
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.log("Error in deleting the Item:", error);
      res.status(500).json({ error: "Error in deleting the item" });
    });
};

module.exports = {
  addToCart,
  getItemsInCart,
  deleteItemInCart,
};
