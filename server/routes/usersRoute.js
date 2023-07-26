const express = require("express")
const { LogIn, signUp, getAllUsers } = require("../controllers/usersController")
const router = express.Router()


router.get("/users", getAllUsers)
router.post("/user/login", LogIn)
router.post("/user/signup", signUp)

module.exports = router
