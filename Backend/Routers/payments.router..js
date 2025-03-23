const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { paymentCalculator, paymentWithCouponDiscount, createOrder, paymentSystem, payment_Success, getPaymentDetails, generateVoucher, payment_failed, payment_cencel} = require('../Controllers/Payments.controllers');
const { validateCreateOrder, validateCoupon } = require('../validators/order.validation');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const paymentRouter = express.Router()


paymentRouter.post('/payment/calculator',userAuthentication,paymentCalculator)
paymentRouter.post('/payment/calculator/coupon',userAuthentication,validateCoupon,validationMiddleware, paymentWithCouponDiscount)
paymentRouter.post('/payment/create-order',userAuthentication,validateCreateOrder,validationMiddleware ,createOrder,paymentSystem)
paymentRouter.post('/payment/success',payment_Success)
paymentRouter.post('/payment/failed',payment_failed)
paymentRouter.post('/payment/cancel',payment_cencel)
paymentRouter.get('/payment/details/:tranId',getPaymentDetails)
paymentRouter.post('/generate/voucher',generateVoucher)
 
module.exports=paymentRouter;