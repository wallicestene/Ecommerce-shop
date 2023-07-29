const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartShema = new Schema({
    item: {
      type : Object,
      required : true
    },
    quantity: {
      type: Number,
      required : true
    },
    userId: {
      type : String,
      required : true
    }
},{ timestamps: true})
const CartItem = mongoose.model("CartItem", cartShema);

// Create a change stream for the CartItem collection
const changeStream = CartItem.watch();


module.exports = {
  CartItem,
  changeStream,
};