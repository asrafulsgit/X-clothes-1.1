const express = require('express');

const userAuthentication = require('../Middlewares/userAuth-middleware')
const { addNewCart, getUserCarts, removeCartItem, getTotalCart, quantityChange } = require('../Controllers/addTocart.controllers');
const { validateGetProductInfo } = require('../validators/product.validators');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const { validateAddCart } = require('../validators/cart.validators');
const addToCartRoute = express.Router()


addToCartRoute.post('/add-to-cart',userAuthentication,validateAddCart,validationMiddleware, addNewCart)

addToCartRoute.get('/get-user-carts',userAuthentication, getUserCarts)
addToCartRoute.put("/update-cart-quantity/:productId",userAuthentication,validateGetProductInfo,validationMiddleware, quantityChange)
addToCartRoute.get("/cart/count",userAuthentication, getTotalCart)

addToCartRoute.delete('/remove-cart-item/:productId',userAuthentication,validateGetProductInfo,validationMiddleware,removeCartItem)

module.exports = {
     addToCartRoute
}
