// getAllProducts
const Products = require("../models/productsModel")

// all products
const getAllProducts = (req,res) => {
    Products.find().sort({createdAt: -1})
    .then(result => res.status(200).json(result))
}
//get single product
const getSingleProduct = (req,res) => {
    const { id } = req.params
    Products.findById(id)
    .then(result => {
        if(!result){
            throw Error("No such Product in the list")
        }else{
            res.json(result)
        }
    })
}




module.exports = { getAllProducts, getSingleProduct }