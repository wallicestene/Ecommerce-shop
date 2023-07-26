const Users = require("../models/UsersModel")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

// function to create token
 const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
 }
// get All Users
const getAllUsers = (req,res) => {
    Users.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch((err)=> console.log("Error in getting all users", err))
}
//logIn user

const LogIn = (req,res) => {
    const {email, password} = req.body
    Users.login(email, password)
    .then(result => {
        // creating a token
        const token = createToken(result._id)

        res.status(200).json({email, token}) 
    })
    .catch((err)=>{
        res.status(400).json({error: err.message})
    })
}
// Signup user

const signUp = (req,res) => {
    const {email, password} = req.body
    Users.signup(email, password)
    .then(result => {
        // creating a token
        const token = createToken(result._id)

        res.status(200).json({email, token}) 
    })
    .catch((err)=>{
        res.status(400).json({error: err.message})
    })
}
module.exports = {
    getAllUsers,
    LogIn,
    signUp
}
