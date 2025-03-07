const { body } = require("express-validator");


const validateAddCart=[
     body("productId").isMongoId().withMessage("Invalid Product ID format"),
     body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),

  body("size").notEmpty().withMessage("Size is required")
    .isString().withMessage("Size must be a string"),
  body("color")
    .notEmpty().withMessage("Color is required")
    .isString().withMessage("Color must be a string"),
]

module.exports={
     validateAddCart
}