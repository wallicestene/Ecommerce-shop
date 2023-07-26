const express = require("express")
const { LogIn, signUp, getAllUsers } = require("../controllers/usersController")
const router = express.Router()


router.get("/users", getAllUsers)
router.post("/users/login", LogIn)
router.post("/users/signuo", signUp)

module.exports = router
