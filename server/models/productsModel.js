const mongoose = require("mongoose")
const Schema = mongoose.Schema

// creating schema for the products model
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        default:"No Description"
    },
    category:{
        type: String,
        required: true
    },
    image_url :{
        type: Array,
        required:true
    },
    isNewItem: {
        type: Boolean,
        default: false,
        required:true
    },
}, {timestamps : true})
module.exports = mongoose.model("product", productSchema)