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
// get All item is cart
// TODO query the items according to the user signend in
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
const deleteItemInCart = (req,res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No Such Item in cart"})
  }
   CartItem.findByIdAndDelete(id)
   .then(result => {
     if(!result){
      return res.status(404).json({error: "No Such ITem in cart"})
     }else{
      res.status(200).json(result)
     }
    })
    .catch((error) => {
      console.log("Error in deleting the Item:", error);
      res.status(500).json({ error: "Error in deleting the item" });
  });

}
module.exports = {
    addToCart,
    getItemsInCart,
    deleteItemInCart
}
