const mongoose = require("mongoose")
const Schema = mongoose.Schema
// creating a users model
const userModel = new Schema({
    email: {
        type : String,
        required : true,
        unique: true
    },
    password:{
        type :String,
        required : true
    }
})
module.exports = mongoose.model("user", userModel)