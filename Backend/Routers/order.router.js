const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { getUserOrders, cancelOrder } = require('../Controllers/order.controllers');
const orderRouter = express.Router()



orderRouter.get('/orders',userAuthentication,getUserOrders)
orderRouter.delete('/order/cancel/:orderId',userAuthentication,cancelOrder)







module.exports = {
     orderRouter
}