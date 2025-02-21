const express = require('express');

const userAuthentication = require('../Middlewares/userAuth-middleware')
const { addNewCart, getUserCarts, removeCartItem, getTotalCart } = require('../Controllers/addTocart.controllers');
const addToCartRoute = express.Router()


addToCartRoute.post('/add-to-cart',userAuthentication, addNewCart)

addToCartRoute.get('/get-user-carts',userAuthentication, getUserCarts)
addToCartRoute.get("/cart/count",userAuthentication, getTotalCart)

addToCartRoute.delete('/remove-cart-item/:productId',userAuthentication,removeCartItem)

module.exports = {
     addToCartRoute
}
