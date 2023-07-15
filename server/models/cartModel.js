const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartShema = new Schema({
    item: Object,
    quantity: Number,
})
module.exports = mongoose.model("cartItem", cartShema)