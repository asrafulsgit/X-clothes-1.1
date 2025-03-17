const express = require('express');
const http = require('http')
const {initSocket, getIo} = require('./socket')

const cookieParser = require('cookie-parser')
const userRouter = require('./Routers/user.router')
const productRouter = require('./Routers/product.router')
const cors = require('cors');
const { addToCartRoute } = require('./Routers/addToCart.router');
const  {favouriteRoute} = require('./Routers/addToFavourite.router');
const paymentRouter = require('./Routers/payments.router.');

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



app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        return res.status(500).send({ message: 'Something went wrong' });
    }
     next();
 });




app.use(userRouter) 
app.use(productRouter)
app.use(addToCartRoute)
app.use(favouriteRoute)
app.use(paymentRouter)

module.exports = server;

