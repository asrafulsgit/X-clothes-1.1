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
 
   const createOrder = async(req,res) => {
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
       return res.status(201).send({
        success : true,
        message : 'order created'
       })
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: 'Something broke!',
          error: error.message
        });
      }
   }
   
   

module.exports={
     paymentCalculator,
     paymentWithCouponDiscount,
     createOrder
}