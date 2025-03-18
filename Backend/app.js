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


// app.post("/payment-success/:tranId", async (req, res) => {
//     const tran_id = req.params.tranId;
//     console.log('redirect')
//     res.redirect(
//         `http://localhost:5173/payment/success/${tran_id}`
//    );
// });
// app.post("/ipn", async (req, res) => {
//     try {
//         const receivedData = req.body;
//         const { val_id, status, tran_id } = receivedData;
//         console.log(receivedData)
//         // Verify payment with SSLCOMMERZ
//         // const validationURL = `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${SSLCOMMERZ_STORE_ID}&store_passwd=${SSLCOMMERZ_STORE_PASSWD}&format=json`;
//         // const validationResponse = await axios.get(validationURL);

//         // if (validationResponse.data.status === "VALID" && status === "VALID") {
//         //     // Update order status in database as 'Paid'
//         //     console.log(`Order ${tran_id} has been paid.`);
//         // } else {
//         //     console.log(`Order ${tran_id} payment validation failed.`);
//         // }

//         // res.status(200).send("IPN Received");
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Error processing IPN");
//     }
// });

module.exports = server;

