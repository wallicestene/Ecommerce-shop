const mongoose = require("mongoose")
const Schema = mongoose.Schema
// creating a users model
const userModel = new Schema({
    name: {
        type : String,
        required : true
    },
    email:{
        type :String,
        unique :true, 
    }
})
module.exports = mongoose.model("user", userModel)