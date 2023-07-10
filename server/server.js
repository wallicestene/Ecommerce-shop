const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const products = require("./models/productsModel")

const productsRoutes = require("./routes/productsRoutes")

require("dotenv").config()


// init app 
const app = express()

// middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log(`Server running on port ${ process.env.PORT }`)
        console.log("Connected to the database");
    })
})
.catch(err => console.log(err.message))

// routes
app.use(productsRoutes)

// fallback route for handling unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  


