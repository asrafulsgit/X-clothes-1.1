const express = require('express');
const favouriteRoute = express.Router()
const userAuthentication = require('../Middlewares/userAuth-middleware')
const {addToFavourite, getFavouriteProducts,removeFavouriteItem,isFavouriteWithHover, getTotalfavorite}=require('../Controllers/addTofavourite.controllers');
const { validateFavoriteProductId } = require('../validators/favorite.validators');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const { validateGetProductInfo } = require('../validators/product.validators');


favouriteRoute.post('/add-to-favourite',userAuthentication,validateFavoriteProductId,validationMiddleware,addToFavourite)
favouriteRoute.get('/get-to-favourite',userAuthentication,getFavouriteProducts)
favouriteRoute.delete('/remove-from-favourite/:productId',userAuthentication,validateGetProductInfo,validationMiddleware, removeFavouriteItem)
favouriteRoute.get('/favorite/count',userAuthentication,getTotalfavorite)
// favouriteRoute.post('/check-from-favourite',isFavouriteWithHover)



module.exports= {favouriteRoute};