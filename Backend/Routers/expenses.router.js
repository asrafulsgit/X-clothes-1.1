const express = require('express');
const adminAuthentication = require('../Middlewares/adminAuth.middleware');
const { addExpenses } = require('../Controllers/expenses.controllers');
const expensesRouter = express.Router()



expensesRouter.post('/admin/add-expenses',adminAuthentication,addExpenses)








module.exports = expensesRouter;