const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { getUserOrders, cancelOrder, getAllOrders, UpdateOrderStatus, getOrder, filterOrders, searchOrders, getAllOrdersWithPagination, userOrderCancelOrder } = require('../Controllers/order.controllers');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');
const orderRouter = express.Router()



orderRouter.get('/user/orders',userAuthentication,getUserOrders)
orderRouter.get('/admin/orders',adminAuthentication,getAllOrdersWithPagination)
orderRouter.get('/admin/orders/filter',adminAuthentication,filterOrders)
orderRouter.get('/admin/orders/search',adminAuthentication,searchOrders)
orderRouter.get('/admin/order/:orderId',adminAuthentication,getOrder) // get one order 
orderRouter.put('/admin/order/:orderId',adminAuthentication,UpdateOrderStatus) // update order status
orderRouter.put('/user/order/cancel/:orderId',userAuthentication,userOrderCancelOrder)







module.exports = {
     orderRouter
}