const { v2 : cloudinary } = require('cloudinary') ;
const fs = require('fs')
const Product = require('../Models/products.model');





// cloudinary configuration
cloudinary.config({ 
     cloud_name: 'dbpes24kn', 
     api_key: '527739673541715', 
     api_secret: 'VfkJpNPsu5lyhApYock5Hp1sjPY'
 });


// only admin can access 
const newProduct = async (req, res) => {
     try {
       const { brand, title, price, sizes, colors,stock, category,subcategory, description } = req.body;

       const images = await Promise.all(
          req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { resource_type: 'image' })
          .then((result) => {
              return new Promise((resolve, reject) => {
                fs.unlink(file.path, (err) => {
                  if (err) reject(`Failed to delete file: ${err.message}`);
                  else resolve(result.secure_url); 
                });
              });
            })
          )
        );

       const newProduct = new Product({
         brand,
         title,
         images,
         price,
         sizes,
         colors,
         stock : Number(stock),
         category: Number(category),
         subcategory: Number(subcategory),
         description,
       });
       await newProduct.save();
       res.status(201).send({
         success: true,
         message: 'Product is added',
         product: newProduct,
       });
     } catch (error) {
       res.status(500).send({
         message: 'Something broke!',
       });
     }
};
const deleteProduct = async(req,res)=>{
     try {
          const {id} = req.body;
          const deleteProduct = await Product.findByIdAndDelete({_id : id})
          res.send({
               success : true,
               message : deleteProduct
          })
          
         } catch (error) {
              res.status(500).send({ message : 'Somthing broke!'})
     }
}
const updateProduct = async(req,res)=>{
     try {
       const {id,...updatedData} = req.body;
          if(!id){
               res.status(404).send({message : 'Product Id required!'})
          }
          const isProduct = await Product.findById(id)
          if(!isProduct){
               res.status(404).send({message : 'Product not find!'})
          }else{
               Object.assign(isProduct,updatedData)
               await isProduct.save()
               res.status(200).send({message : 'Product is updated'})
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'}) 
     }
}

const getAllProduct = async (req,res) => {
     try {
      const allProduct = await Product.find()
      if(allProduct.length <= 0 || !allProduct){
           res.status(404).send({
                success : false, 
                message : 'product is not Found!'
           })
      }else{
          res.status(200).send({
               success : true, 
               products : allProduct
          })
      }
      
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}


// random users access 
const getProductByCategory = async(req,res)=>{
     try {
          const {subcategory} = req.body;
          const convertSubCategory = Number(subcategory)
          const isProduct = await Product.find({subcategory : convertSubCategory});
          if(!isProduct || isProduct.length <= 0){
               res.status(404).send({message : 'Product is not available!'})
          }else{
               res.status(200).send({
                    products : isProduct
               })
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}
const getOneProduct = async(req,res)=>{
     try {
          const {id} = req.body;
          const isProduct = await Product.findById(id);
          if(!isProduct){
               res.status(404).send({message : 'Product is not found!'})
          }else{
               res.status(200).send({
                    product : isProduct
               })
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}
// get product by categories 
const getProductByCategories = async(req,res)=>{
     try {
          const {categories} = req.body;
          const convertCategories = categories.map(item => Number(item))
          const products = await Product.find({'category' : {$in : convertCategories}})
          if(products.length > 0){
               res.status(200).send({products : products})
          }else{
               res.status(404).send({message : 'this product is not available!'})
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}


module.exports = {
     newProduct,
     getAllProduct,
     deleteProduct,
     getProductByCategory,
     getOneProduct,
     getProductByCategories,
     updateProduct
} 