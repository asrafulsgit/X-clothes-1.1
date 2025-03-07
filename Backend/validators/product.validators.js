const {param, body}=require('express-validator')

const validateDeleteProduct =[
     param('addressId').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.').escape(), 
]

const validateUpdateProduct = [
     body("brand").notEmpty().withMessage("Brand is required").isString().withMessage("Brand must be a string"),
     body("title").notEmpty().withMessage("Title is required").isString().withMessage("Title must be a string"),
     body("images").isArray({ min: 1 }).withMessage("Images must be an array with at least one item"),
     body("price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
     body("sizes").isArray({ min: 1 }).withMessage("Sizes must be an array"),
     body("colors").isArray({ min: 1 }).withMessage("Colors must be an array"),
     body("stock").notEmpty().withMessage("Stock is required").isInt().withMessage("Stock must be a number"),
     body("category").notEmpty().withMessage("Category is required").isInt().withMessage("Category must be a number"),
     body("subcategory").notEmpty().withMessage("Subcategory is required").isInt().withMessage("Subcategory must be a number"),
     body("description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string")
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
     validateCategories
}