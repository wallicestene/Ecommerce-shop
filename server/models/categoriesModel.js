const mongoose = require("mongoose")
const Schema = mongoose.Schema
// creating a categories schema
const categoriesSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    image_url: {
        type : String,
        required: true
    }
})
module.exports = mongoose.model("category", categoriesSchema)
