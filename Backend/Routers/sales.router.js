const { bestSalesProducts, pupulerProducts, calculateSalesExpensesProfit } = require('../Controllers/sales.controllers');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');
const userAuthentication = require('../Middlewares/userAuth-middleware');

const salesRouter = require('express').Router()



salesRouter.get('/sales/best-sales',bestSalesProducts) // based on sales
salesRouter.get('/favorite/popular',pupulerProducts) // based on user favorites

salesRouter.get('/admin/sales/expenses/profit/:year/:month',adminAuthentication, calculateSalesExpensesProfit) // based on user favorites



module.exports = salesRouter;