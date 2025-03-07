const { body } = require("express-validator");



const validateFavoriteProductId =[
     body('productId').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.').escape(), 
]


module.exports={
     validateFavoriteProductId
}