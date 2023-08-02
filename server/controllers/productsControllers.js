// getAllProducts
const Products = require("../models/productsModel")
const mongoose = require("mongoose")

const searchAll = (req,res) => {
    Products.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to fetch all products' });
      });
}

// all products with query
const getAllProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 4;
    const skip = (page - 1) * perPage;
  
    Products.find()
      .skip(skip)
      .limit(perPage)
      .then((result) => {
        // Fetch the total count of products for pagination
        Products.countDocuments().then((totalCount) => {
          res.status(200).json({
            products: result,
            totalCount,
          })
        });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to fetch products' });
      });
  };
  
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
    const {name, price, description, category, isNewItem} = req.body 

    const image_url = req.file.filename

    Products.create({name, price, description, category, image_url, isNewItem})
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



module.exports = { getAllProducts, searchAll ,getSingleProduct, addProducts, deleteProduct, updateProduct}