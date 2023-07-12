// getallcategories
const Categories = require("../models/categoriesModel")

const getAllCategories = (req,res) =>{
    Categories.find().sort({createdAt: -1})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch((err)=> {
        console.log("Error in getting all categories", err);
    })
}
const addCategory = (req,res) =>{
    const {name} = req.body;

    const image_url = req.file.filename

    if(!name ||!image_url){
        return  res.status(400).send({message: "Please provide name and image_url of the category"})
    }else{
        Categories.create({name, image_url})
        .then((result)=> {
            res.status(200).json(result);
        })
        .catch((err)=> {
            console.log("Failed to add the category")
        })
    }
}

module.exports = {getAllCategories, addCategory}