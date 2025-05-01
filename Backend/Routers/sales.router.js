const { bestSalesProducts, pupulerProducts } = require('../Controllers/sales.controllers');
const userAuthentication = require('../Middlewares/userAuth-middleware');

const salesRouter = require('express').Router()



salesRouter.get('/sales/best-sales',bestSalesProducts) // based on sales
salesRouter.get('/favorite/popular',pupulerProducts) // based on user favorites



module.exports = salesRouter;