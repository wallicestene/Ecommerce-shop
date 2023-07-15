const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartShema = new Schema({
    itemId: String,
    quantity: Number,
})
module.exports = mongoose.model("cartItem", cartShema)