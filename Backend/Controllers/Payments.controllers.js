const SSLCommerzPayment = require('sslcommerz-lts')
const { ObjectId } = require('mongodb');
const Order = require("../Models/Order.model");
const Product = require("../Models/products.model");
const User = require("../Models/user.model");

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
       const productDiscount = product.discount ? (price * quantity * Number(product.discount)) / 100 : 0;
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
   
       return res.status(200).send({
         success: true,
         message: 'Successfully calculated',
         subTotal,
         discount,
         taxes,
         shippingCost,
         total
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
 
   const createOrder = async(req,res,next) => {
     try {
       const user = req.userInfo.id;
       const isUser = await User.findById(user)
       if(!isUser){
        return res.status(404).send({
          success : false,
          message : 'user not found!'
        })
       }
       const {carts,shippingAddress,couponCode} = req.body;
       const productIds = carts.map(cart => cart.productId._id);
       const products = await Product.find({ _id: { $in: productIds } }).lean();
   
       const { subTotal, discount, taxes,shippingCost} = calculateTotals(carts, products);
       
       const couponDiscount = couponDiscountCalculator(couponCode);
       const total = (subTotal + taxes + shippingCost) - (discount + couponDiscount);
       
       const cartsInfo = carts.map((item) =>{
        const product = item.productId._id;
        const quantity = item.quantity;
        const color = item.color;
        const size = item.size;
        const items = {product,quantity,color,size}
        return items;
        })
        console.log(user)
       const newOrder = new Order({
        user,
        items : cartsInfo,
        shippingAddress,
        subTotal,
        couponCode,
        discount,
        taxes,
        shippingCost,
        total
       })
       await newOrder.save()
       req.orderInfo = {
        order_id : newOrder._id.toString(),
        amount : newOrder.total,
        customer_name : newOrder.shippingAddress.name, 
        customer_email : newOrder.shippingAddress?.email , 
        customer_phone : newOrder.shippingAddress.phone
       }
       next()
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: 'Something broke!',
          error: error.message
        });
      }
   }
   
   const tran_id = new ObjectId().toString();
   const SSLCOMMERZ_STORE_ID = process.env.STORE_ID;
   const SSLCOMMERZ_STORE_PASSWD = process.env.STORE_PASSWORD;
  //  const SSLCOMMERZ_API_URL = "https://securepay.sslcommerz.com/gwprocess/v4/api.php";
   const SUCCESS_URL =`${process.env.FRONTEND_URL}/payment-success/${tran_id}`;
   const FAIL_URL = `${process.env.FRONTEND_URL}/payment-fail`;
   const CANCEL_URL = `${process.env.FRONTEND_URL}/payment-cancel`;
   const IPN_URL = `${process.env.FRONTEND_URL}/ipn`;
   const is_live = false

   const paymentSystem = async(req,res)=>{
     try {
      const { amount,order_id, customer_name, customer_email, customer_phone } = req.orderInfo;

      const orderData = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: tran_id, 
        success_url: `${SUCCESS_URL}`,
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
        ship_postcode:1200,
        ship_country: 'Bangladesh',
   };

      const sslcz = new SSLCommerzPayment(SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWD, is_live)
      const response = await sslcz.init(orderData)  
      return res.status(200).send({
        url : response,
        success : true,
        message : 'payment is processing'
      })
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: "Payment initiation failed." });
  }
   }





   
   

module.exports={
     paymentCalculator,
     paymentWithCouponDiscount,
     createOrder,
     paymentSystem
}