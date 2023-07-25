const express = require("express")
const { get } = require("./productsRoutes")
const { LogIn, signUp } = require("../controllers/usersController")
const router = express.Router()


router.get("/users", get)
router.post("/users", LogIn)
router.post("/users", signUp)

module.exports = router
