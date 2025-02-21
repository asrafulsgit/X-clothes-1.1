const express = require('express');
const favouriteRoute = express.Router()
const userAuthentication = require('../Middlewares/userAuth-middleware')
const {addToFavourite, getFavouriteProducts,removeFavouriteItem,isFavouriteWithHover, getTotalfavorite}=require('../Controllers/addTofavourite.controllers');


favouriteRoute.post('/add-to-favourite',userAuthentication,addToFavourite)
favouriteRoute.get('/get-to-favourite',userAuthentication,getFavouriteProducts)
favouriteRoute.delete('/remove-from-favourite/:productId',userAuthentication,removeFavouriteItem)
favouriteRoute.get('/favorite/count',userAuthentication,getTotalfavorite)
favouriteRoute.post('/check-from-favourite',isFavouriteWithHover)



module.exports= {favouriteRoute};