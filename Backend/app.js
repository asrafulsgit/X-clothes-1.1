const express = require('express');
const http = require('http')
const {initSocket, getIo} = require('./socket')

const cookieParser = require('cookie-parser')
const userRouter = require('./Routers/user.router')
const productRouter = require('./Routers/product.router')
const cors = require('cors');
const { addToCartRoute } = require('./Routers/addToCart.router');
const  {favouriteRoute} = require('./Routers/addToFavourite.router');
const paymentRouter = require('./Routers/payments.router');
const { orderRouter } = require('./Routers/order.router');
const salesRouter = require('./Routers/sales.router');
const expensesRouter = require('./Routers/expenses.router');
const ApiError = require('./utils/ApiError');
const errorHandler = require('./Middlewares/errorHandler');

const app = express();
const server = http.createServer(app)
const io = initSocket(server)

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
     origin : process.env.FRONTEND_URL,
     credentials : true
}))



app.use(userRouter) 
app.use(productRouter)
app.use(addToCartRoute)
app.use(favouriteRoute)
app.use(paymentRouter)
app.use(orderRouter)
app.use(salesRouter)
app.use(expensesRouter)


app.all('*', (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);





module.exports = server;

