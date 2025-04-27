const {param, body}=require('express-validator')

const validateDeleteProduct =[
     param('productId').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.').escape(), 
]

const validateUpdateProduct = [
     body("product.brand").notEmpty().withMessage("Brand is required").isString().withMessage("Brand must be a string"),
     body("product.title").notEmpty().withMessage("Title is required").isString().withMessage("Title must be a string"),
     body("product.images").isArray({ min: 1 }).withMessage("Images must be an array with at least one item"),
     body("product.price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
     body("product.sizes").isArray({ min: 1 }).withMessage("Sizes must be an array"),
     body("product.colors").isArray({ min: 1 }).withMessage("Colors must be an array"),
     body("product.stock").notEmpty().withMessage("Stock is required").isInt().withMessage("Stock must be a number"),
     body("product.category").notEmpty().withMessage("Category is required").isInt().withMessage("Category must be a number"),
     body("product.subcategory").notEmpty().withMessage("Subcategory is required").isInt().withMessage("Subcategory must be a number"),
     body("product.description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
     body("product.discount").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
     body("product.taxes").notEmpty().withMessage("Taxes is required").isString().withMessage("Taxes must be a string")
   ]
   const parseProductData = (req, res, next) => {
     const { productData } = req.body;
   
     if (!productData) {
       return res.status(400).send({
         success: false,
         message: 'Product data is missing',
       });
     }
   
     try {
       req.body.productData = JSON.parse(productData);
       next();
     } catch (error) {
       return res.status(400).send({
         success: false,
         message: 'Invalid product data format',
       });
     }
   };
   
const validateAddProduct = [
     body("productData.brand").notEmpty().withMessage("Brand is required").isString().withMessage("Brand must be a string"),
     body("productData.title").notEmpty().withMessage("Title is required").isString().withMessage("Title must be a string"),
     body("productData.price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
     body("productData.sizes").isArray({ min: 1 }).withMessage("Sizes must be an array"),
     body("productData.colors").isArray({ min: 1 }).withMessage("Colors must be an array"),
     body("productData.stock").notEmpty().withMessage("Stock is required").isInt().withMessage("Stock must be a number"),
     body("productData.category").notEmpty().withMessage("Category is required").isInt().withMessage("Category must be a number"),
     body("productData.subcategory").notEmpty().withMessage("Subcategory is required").isInt().withMessage("Subcategory must be a number"),
     body("productData.description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
     body("productData.discount").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
     body("productData.taxes").notEmpty().withMessage("Taxes is required").isString().withMessage("Taxes must be a string")
   ]
const validateSubCategory =[
     body('subcategory').isLength({min : 3 , max : 3}).withMessage('Invalid url').escape(), 
]

const validateGetProductInfo =[
     param('productId').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.').escape(), 
]

const validateCategories =[
     body("categories")
    .isArray({ min: 1 }).withMessage("Categories must be an array with at least one item")
    .custom((categories) => {
      if (!categories.every(item => !isNaN(item))) {
        throw new Error("Each category must be a valid number");
      }
      return true;
    }),
]




module.exports={
     validateDeleteProduct,
     validateUpdateProduct,
     validateSubCategory,
     validateGetProductInfo,
     validateCategories,
     validateAddProduct,
     parseProductData
}