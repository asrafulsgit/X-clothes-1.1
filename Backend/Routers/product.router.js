const express = require('express')
const productRouter = express.Router();
const { v2 : cloudinary } = require('cloudinary') ;
const upload = require('../Middlewares/product.middleware');
const {newProduct,getAllProduct, deleteProduct, getProductByCategory, getOneProduct, getProductByCategories,updateProduct} = require('../Controllers/product.controllers');


// add product for admin 
productRouter.post('/admin/add-product',upload.array('images'), newProduct)

// get all product  for admin
productRouter.get('/admin/all-product', getAllProduct)

// delete product  for admin
productRouter.delete('/admin/delete-product',deleteProduct)
// update product for admin
productRouter.put('/admin/update-product',updateProduct)

// get product by subcategory for all users
productRouter.post('/get-product-by-subcategory',getProductByCategory )

// get one product by subcategory for see product info
productRouter.post('/get-one-product', getOneProduct)


productRouter.post('/get-product-by-categoris', getProductByCategories )






module.exports = productRouter