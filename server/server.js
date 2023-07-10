const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")

// init app 

const app = express()

// middleware
app.use(morgan("dev"))
app.use(cors())

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})
