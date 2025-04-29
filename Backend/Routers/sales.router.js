const { bestSalesProducts } = require('../Controllers/sales.controllers');
const userAuthentication = require('../Middlewares/userAuth-middleware');

const salesRouter = require('express').Router()



salesRouter.get('/sales/best-sales',userAuthentication,bestSalesProducts)



module.exports = salesRouter;