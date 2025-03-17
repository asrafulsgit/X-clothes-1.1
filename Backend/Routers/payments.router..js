const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { paymentCalculator, paymentWithCouponDiscount } = require('../Controllers/Payments.controllers');
const paymentRouter = express.Router()


paymentRouter.post('/payment/calculator',userAuthentication,paymentCalculator)
paymentRouter.post('/payment/calculator/coupon',userAuthentication,paymentWithCouponDiscount)

module.exports=paymentRouter;