const SSLCommerzPayment = require('sslcommerz-lts')
const { ObjectId } = require('mongodb');
const puppeteer = require('puppeteer');
const Order = require("../Models/Order.model");
const Product = require("../Models/products.model");
const User = require("../Models/user.model");
const Payment = require('../Models/payment.model');
const Address = require('../Models/userAddress.model');

const calculateTotals = (carts, products) => {
     let subTotal = 0;
     let discount = 0;
     let taxes = 0;
     let shippingCost = Number(process.env.SHIPPING_COST)
     const missingProducts = [];
   
     const productMap = new Map(products.map(product => [product._id.toString(), product]));
   
     for (const cart of carts) {
       const { productId, quantity } = cart;
       const product = productMap.get(productId._id.toString());
   
       if (!product) {
         missingProducts.push(productId._id.toString());
         continue;
       }
   
       const price = Number(product.price);
       const productDiscount = product.discount ? (price * quantity * product.discount) / 100 : 0;
       const productTaxes = product.taxes ? Number(product.taxes) * quantity : 0;
   
       discount += Math.floor(productDiscount);
       taxes += Math.floor(productTaxes);
       subTotal += Math.floor(price * quantity);
     }
   
     return { subTotal, discount, taxes,shippingCost, missingProducts };
   };
   

const couponDiscountCalculator = (couponCode)=>{
  let couponDiscount = 0;
       if (couponCode && couponCode === process.env.COUPON_CODE) {
         couponDiscount = parseFloat(process.env.COUPON_DISCOUNT) || 0;
       }
  return couponDiscount;
}
   
  const paymentCalculator = async (req, res) => {
    const {id} = req.userInfo;
     try {
       const { carts } = req.body;
       const productIds = carts.map(cart => cart.productId._id);
       const products = await Product.find({ _id: { $in: productIds } }).lean();
       
       const { subTotal, discount, taxes,shippingCost, missingProducts } = calculateTotals(carts, products);
   
       if (missingProducts.length > 0) {
         return res.status(400).send({
           success: false,
           message: 'Some products were not found.',
           missingProducts
         });
       }
   
       const total = (subTotal + taxes + shippingCost) - discount;
       const addresses = await Address.find({user : id})
       return res.status(200).send({
         success: true,
         message: 'Successfully calculated',
         subTotal,
         discount,
         taxes,
         shippingCost,
         total,
         addresses
       });
     } catch (error) {
       return res.status(500).send({
         success: false,
         message: 'Something went wrong!',
         error: error.message
       });
     }
  };
   
   const paymentWithCouponDiscount = async (req, res) => {
     try {  
       const { carts, couponCode } = req.body; 

       const productIds = carts.map(cart => cart.productId._id);
       const products = await Product.find({ _id: { $in: productIds } }).lean();
   
       const { subTotal, discount, taxes,shippingCost} = calculateTotals(carts, products);
   
       
       const couponDiscount = couponDiscountCalculator(couponCode);
       const total = (subTotal + taxes + shippingCost) - (discount + couponDiscount);
       
       return res.status(200).send({
         success: true,
         message: 'Successfully calculated',
         subTotal,
         discount,
         taxes,
         couponDiscount,
         shippingCost,
         total
       });
   
     } catch (error) {
       return res.status(500).send({
         success: false,
         message: 'Something broke!',
         error: error.message
       });
     }
   };
 
   const createOrder = async (req, res, next) => {
    const session = await Product.startSession();
    try {
      await session.withTransaction(async () => {
        const { userInfo, body } = req;
        const user = userInfo.id;
        const { carts, shippingAddress, couponCode } = body;
  
        const userRecord = await User.findById(user).session(session);
        if (!userRecord) {
          throw new Error('User not found!');
        }
  
        const productIds = carts.map(cart => cart.productId._id);
        const products = await Product.find({ _id: { $in: productIds } }).session(session).lean();
        const productMap = new Map(products.map(p => [p._id.toString(), p]));
        
        const { subTotal, discount, taxes, shippingCost } = calculateTotals(carts, products);
        const couponDiscount = couponDiscountCalculator(couponCode);
        const total = (subTotal + taxes + shippingCost) - (discount + couponDiscount);
  
        const bulkUpdates = [];
        const cartsInfo = carts.map(cart => {
          const product = productMap.get(cart.productId._id.toString());
          
          if (!product || product.stock < cart.quantity) {
            throw new Error(`Insufficient stock for product: ${product?.name || cart.productId._id}`);
          }
  
          bulkUpdates.push({
            updateOne: {
              filter: { _id: cart.productId._id },
              update: { $inc: { stock: -cart.quantity } }
            }
          });
  
          return {
            product: cart.productId._id,
            quantity: cart.quantity,
            color: cart.color,
            size: cart.size
          };
        });
  
        if (bulkUpdates.length > 0) {
          await Product.bulkWrite(bulkUpdates, { session });
        }
  
        const newOrder = new Order({
          user,
          items: cartsInfo,
          shippingAddress,
          subTotal,
          couponCode,
          couponDiscount,
          discount,
          taxes,
          shippingCost,
          total
        });
  
        await newOrder.save({ session });
  
        req.orderInfo = {
          order_id: newOrder._id.toString(),
          amount: newOrder.total,
          customer_name: newOrder.shippingAddress.name,
          customer_email: newOrder.shippingAddress?.email,
          customer_phone: newOrder.shippingAddress.phone
        };
      });
  
      session.endSession();
      next();
      
    } catch (error) {
      session.endSession();
      return res.status(500).send({
        success: false,
        message: 'Something went wrong!',
        error: error.message
      });
    }
  };

   const SSLCOMMERZ_STORE_ID = process.env.STORE_ID;
   const SSLCOMMERZ_STORE_PASSWD = process.env.STORE_PASSWORD;
  // const SSLCOMMERZ_API_URL = "https://securepay.sslcommerz.com/gwprocess/v4/api.php";
   const SUCCESS_URL =`${process.env.BACKEND_URL}/payment/success`;
   const FAIL_URL = `${process.env.BACKEND_URL}/payment/failed`;
   const CANCEL_URL = `${process.env.BACKEND_URL}/payment/cancel`;
   const IPN_URL = `${process.env.BACKEND_URL}/ipn`;
   const is_live = false

  const paymentSystem = async (req, res) => {
    try {
      const { order_id, amount, customer_name, customer_email, customer_phone } = req.orderInfo;
      const userId = req.userInfo.id;
      const tran_id = new ObjectId().toString();
  
      const payment = new Payment({
        orderId: order_id,
        userId,
        amount,
        transactionId: tran_id,
      });
  
      await payment.save();
  
      const orderData = prepareOrderData({
        order_id,
        amount,
        tran_id,
        customer_name,
        customer_email,
        customer_phone,
      });
  
      const sslcz = new SSLCommerzPayment(SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWD, is_live);
      const response = await sslcz.init(orderData);
  
      return res.status(200).json({
        success: true,
        message: 'Payment is being processed',
        url: response,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Payment initiation failed',
        error: error.message,
      });
    }
  };
  
  const prepareOrderData = ({ order_id, amount, tran_id, customer_name, customer_email, customer_phone }) => {
    return {
      order_id,
      total_amount: amount,
      currency: 'BDT',
      tran_id,
      success_url: SUCCESS_URL,
      fail_url: FAIL_URL,
      cancel_url: CANCEL_URL,
      ipn_url: IPN_URL,
      shipping_method: 'Courier',
      product_name: 'Ecommerce Purchase',
      product_category: 'General',
      product_profile: 'general',
      cus_name: customer_name,
      cus_email: customer_email || 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1200',
      cus_country: 'Bangladesh',
      cus_phone: customer_phone,
      cus_fax: '0171.......',
      ship_name: customer_name,
      ship_add1: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: '1200',
      ship_country: 'Bangladesh',
    };
  };
  

const payment_Success = async (req, res) => {
    try {
      const data = req.body;
      const tran_id = data.tran_id;
        if (!data.val_id) {
            console.error("val_id is missing");
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

        const sslcz = new SSLCommerzPayment(SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWD, is_live);
        const validationResponse = await sslcz.validate(data);

        console.log("SSLCOMMERZ Validation Response:", validationResponse);

        if (validationResponse.status !== "VALID") {
            console.error("Invalid Transaction:", validationResponse);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

        const payment = await Payment.findOne({transactionId : tran_id });
        if (!payment) {
            console.error("Payment record not found for transaction ID:", tran_id);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

        const order = await Order.findById(payment.orderId );

        if (!order) {
            console.error("Order not found for order ID:", payment.orderId);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

       order.paymentDetails.status = 'Paid'
       order.paymentDetails.transactionId = tran_id;
       await order.save();
       payment.paymentStatus = 'Paid'
       payment.paymentDetails = data
       await payment.save();

       res.redirect(`${process.env.FRONTEND_URL}/payment/success/${tran_id}`);

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
    }
};
const payment_failed = async (req, res) => {
    try { 
      const data = req.body;
      const tran_id =  data.tran_id;
      const payment = await Payment.findOne({transactionId : tran_id });
        if (!payment) {
            console.error("Payment record not found for transaction ID:", tran_id);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

        const order = await Order.findById(payment.orderId );

        if (!order) {
            console.error("Order not found for order ID:", payment.orderId);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

       order.paymentDetails.status = 'Failed'
       order.paymentDetails.transactionId = tran_id;
       await order.save();
       payment.paymentStatus = 'Failed'
       payment.paymentDetails = data
       await payment.save();
       res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${tran_id}`);

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
    }
};
const payment_cencel = async (req, res) => {
    try { 
      const data = req.body;
      const tran_id =  data.tran_id;
      console.log(data)
      const payment = await Payment.findOne({transactionId : tran_id });
        if (!payment) {
            console.error("Payment record not found for transaction ID:", tran_id);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

        const order = await Order.findById(payment.orderId );

        if (!order) {
            console.error("Order not found for order ID:", payment.orderId);
            return res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
        }

       order.paymentDetails.status = 'Cencel'
       order.paymentDetails.transactionId = tran_id;
       await order.save();
       payment.paymentStatus = 'Cencel'
       payment.paymentDetails = data
       await payment.save();

       res.redirect(`${process.env.FRONTEND_URL}/payment/cancel/${tran_id}`);

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/error`);
    }
};

const getPaymentDetails = async (req, res) => {
  try {
      const { tranId } = req.params; 

      if (!tranId) {
          return res.status(400).json({ error: "Transaction ID is required" });
      }

      const payment = await Payment.findOne({transactionId : tranId })
      const OrderDetails = await Order.findById(payment.orderId).populate('items.product', 'title price');
      
      
      if (!payment) {
          return res.status(404).json({ error: "Payment record not found." });
      }

      return res.status(200).json({
          success: true,
          orderDetails : JSON.stringify(OrderDetails) ,
          paymentDetails: {
              order_id : payment.orderId,
              tran_id: payment.transactionId,
              amount: payment.amount,
              payment_type : payment.paymentDetails.card_issuer,
              status: payment.paymentStatus,
              val_id: payment.paymentDetails.val_id,
              createdAt : payment.createdAt
          }
      });
  } catch (error) {
      console.error("Failed to get payment details:", error);
      res.status(500).json({ error: "Failed to fetch payment details." });
  }
};

const generateVoucher = async (req, res) => {
  try {
    const { orderInfo, paymentInfo, customerInfo } = req.body;

    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: "Poppins", sans-serif; background: #f4f4f4; }
          .voucher-container { max-width: 700px; margin: 20px auto; padding: 20px; background: white; border: 1px solid #ddd; }
          .voucher-title { text-align: center; font-size: 24px; font-weight: 600; color: #D91656; }
          .voucher-subtitle { text-align: center; color: gray; font-weight: bold; }
          .voucher-section { display: flex; justify-content: space-between; margin-top: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
          .voucher-column h3 { font-size: 16px; font-weight: 600; }
          .voucher-column p { font-size: 14px; }
          .voucher-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .voucher-table th, .voucher-table td { border: 1px solid #ddd; padding: 5px; text-align: left; }
          .voucher-table th { background: #f4f4f4; font-size: 14px; font-weight: 600; }
          .payment-date { text-align: right; margin-top: 10px; color: gray; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="voucher-container">
          <h2 class="voucher-title">Disbursement Voucher</h2>
          <p class="voucher-subtitle">X CLOTHE</p>
          
          <div class="voucher-section">
            <div class="voucher-column">
              <h3>Bill To:</h3>
              <p><strong>Name:</strong> ${customerInfo.name}</p>
              <p><strong>Address:</strong> ${customerInfo.zila}, ${customerInfo.upazila}</p>
              <p><strong>Email:</strong> ${customerInfo.email ? customerInfo.email : ""}</p>
              <p><strong>Phone:</strong> ${customerInfo.phone}</p>
            </div>
            <div class="voucher-column">
              <h3>Payment Method:</h3>
              <p><strong>Payment Type:</strong> ${paymentInfo.payment_type}</p>
              <p><strong>Tran. ID:</strong> ${paymentInfo.tran_id}</p>
              <p><strong>Order ID:</strong> ${paymentInfo.order_id}</p>
              <p><strong>Status:</strong> ${paymentInfo.status}</p>
            </div>
          </div>
          
          <h3 class="voucher-items-title">Details</h3>
          <table class="voucher-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderInfo.items.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.product.title}</td>
                  <td>${item.quantity}</td>
                  <td>${item.product.price}</td>
                  <td>${item.product.price * item.quantity}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <div class="voucher-summary">
            <table class="voucher-table">
              <thead><tr><th colspan="2" style="text-align: center;">Summary</th></tr></thead>
              <tbody>
                <tr><td><strong>Subtotal</strong></td><td>${orderInfo.subTotal}</td></tr>
                <tr><td><strong>Tax</strong></td><td>${orderInfo.taxes}</td></tr>
                <tr><td><strong>Coupon Discount</strong></td><td>${orderInfo.couponDiscount}</td></tr>
                <tr><td><strong>Discount</strong></td><td>${orderInfo.discount}</td></tr>
                <tr><td><strong>Shipping Cost</strong></td><td>${orderInfo.shippingCost}</td></tr>
                <tr><td><strong>Total</strong></td><td>${orderInfo.total}</td></tr>
              </tbody>
            </table>
          </div>

          <div class="payment-date">
            <p>${paymentInfo.createdAt.split("T")[0]}</p>
          </div>
        </div>
      </body>
    </html>`;
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="voucher.pdf"');
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};

const cleanOldOrderAndPayment = async() => {
  const cleanPaymentDb = await Payment.deleteMany({
    paymentStatus: { $nin: ["paid", "refunded"] }, // Not "paid","refunded"
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 24 hours ago
  });
  const cleanOrderDb = await Order.deleteMany({
    'paymentStatus.status': { $nin: ["paid", "refunded"] }, // Not "paid"
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 24 hours ago
  });
}








// async function hello (){
//   await Order.deleteMany()
//   await Payment.deleteMany()
// }
// hello() 
   
 



   
   

module.exports={
     paymentCalculator,
     paymentWithCouponDiscount,
     createOrder,
     paymentSystem,
     payment_Success,
     getPaymentDetails,
     generateVoucher,
     payment_failed,
     payment_cencel,
     cleanOldOrderAndPayment
}