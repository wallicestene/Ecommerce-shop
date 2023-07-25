const Users = require("../models/UsersModel")
const mongoose = require("mongoose")
// get All Users
const getAllUsers = (req,res) => {
    Users.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch((err)=> console.log("Error in getting all users", err))
}
// adding user to the users collection

const LogIn = (req,res) => {
    const {name, email} = req.body
    Users.create({name, email})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(()=>console.error('Failed To Add User'))
}
const signUp = (req,res) => {
    const {name, email} = req.body
    Users.create({name, email})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(()=>console.error('Failed To Add User'))
}
module.exports = {
    getAllUsers,
    LogIn,
    signUp
}
