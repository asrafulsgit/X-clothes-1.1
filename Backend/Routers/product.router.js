const express = require('express')
const productRouter = express.Router();
const upload = require('../Middlewares/product.middleware');
const {newProduct,getAllProduct, deleteProduct, getProductByCategory, getOneProduct, getProductByCategories,updateProduct} = require('../Controllers/product.controllers');
const { fileErrorHandlerMiddleware } = require('../Middlewares/fileErrorHandle.middleware');
const { validateDeleteProduct, validateUpdateProduct, validateSubCategory, validateGetProductInfo, validateCategories } = require('../validators/product.validators');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');


// add product for admin 
productRouter.post('/admin/add-product',adminAuthentication,
upload.array('images'),fileErrorHandlerMiddleware,
validateUpdateProduct,validationMiddleware, newProduct)

// get all product  for admin
productRouter.get('/admin/all-product',adminAuthentication, getAllProduct)

// delete product  for admin
productRouter.delete('/admin/delete-product/:productId',adminAuthentication,
     validateDeleteProduct,validationMiddleware,deleteProduct)
// update product for admin
productRouter.put('/admin/update-product',adminAuthentication,validateUpdateProduct,
validationMiddleware,updateProduct)




// get product by subcategory for all users
productRouter.post('/get-product-by-subcategory',validateSubCategory,validationMiddleware,getProductByCategory )

// get one product by subcategory for see product info
productRouter.get('/get-one-product/:productId',validateGetProductInfo,validationMiddleware, getOneProduct)


productRouter.post('/get-product-by-categoris',validateCategories,validationMiddleware, getProductByCategories )






module.exports = productRouter