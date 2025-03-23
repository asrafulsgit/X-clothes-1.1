const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { getUserOrders } = require('../Controllers/order.controllers');
const orderRouter = express.Router()




orderRouter.get('/orders',userAuthentication,getUserOrders)






module.exports = {
     orderRouter
}