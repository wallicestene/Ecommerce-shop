const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartShema = new Schema({
    item: Object,
    quantity: Number,
})
const CartItem = mongoose.model("CartItem", cartShema);

// Create a change stream for the CartItem collection
const changeStream = CartItem.watch();


module.exports = {
  CartItem,
  changeStream,
};