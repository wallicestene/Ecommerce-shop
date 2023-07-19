// getAllProducts
const Products = require("../models/productsModel")
const mongoose = require("mongoose")


// all products
const getAllProducts = (req,res) => {
    Products.find().sort({createdAt: -1})
    .then(result => res.status(200).json(result))
}
//get single product
const getSingleProduct = (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Product"})
    }
    Products.findById(id)
    .then(result => {
        if(!result){
            return res.status(404).json({error: "No such customer"})
        }
        else{
           res.status(200).json(result)
        }
    })
    .catch((error) => {
        // Handling any potential error during the query
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
}
// add  products
const addProducts = (req,res) =>{
    const {name, price, description, category, newItem} = req.body 

    const image_url = req.file.filename

    Products.create({name, price, description, category, image_url, newItem})
    .then(product => {
        res.json(product)
    })
    .catch(err =>{
        console.log(err.message)
        res.json({error: "Error in adding a product"})
    })
}
// delete aproduct
const deleteProduct = (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Product"})
    }

    Products.findByIdAndDelete(id)
    .then(result => {
        if(!result){
            return res.status(404).json({error: "No Such Product"})
        }else{
            res.status(200).json(result)
        }
    })
    .catch((error) => {
        console.log("Error in deleting product:", error);
        res.status(500).json({ error: "Error in deleting product" });
    });
}
// updating a product
const updateProduct = (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Product"})
    }
    Products.findByIdAndUpdate({_id: id}, {...req.body})
    .then(result => {
        if(!result){
            return res.status(404).json({error: "No Such Product"})
        }else{
            res.status(200).json(result)
        }
    })
    .catch((error) => {
        console.log("Error in updating product:", error);
        res.status(500).json({ error: "Error in updating product" });
    });
}



module.exports = { getAllProducts, getSingleProduct, addProducts, deleteProduct, updateProduct}