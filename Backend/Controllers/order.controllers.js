const Order = require("../Models/Order.model");


const getUserOrders = async (req, res) => {
     try {
       const userId = req.userInfo.id;
       const orders = await Order.find({
         user: userId,
         "paymentDetails.status": "Paid"
       })
         .populate("items.product", "title images")
         .lean(); 
   
       if (orders.length === 0) {
         return res.status(400).send({ success: false, message: `You don't have any paid orders!` });
       }
   
       return res.status(200).send({
         orders,
         success: true,
         message: 'Orders successfully fetched'
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
   };
   

   const cancelOrder = async (req, res) => {
     try {
       const userId = req.userInfo.id;
       const orderId = req.params.orderId;
   
       const order = await Order.findOne({ _id: orderId, user: userId });
   
       if (!order || order.orderStatus.toLowerCase() !== 'processing') {
         return res.status(400).send({ success: false, message: 'You cannot cancel this order!' });
       }
   
       await order.deleteOne()
   
       return res.status(200).send({ success: true, message: 'Order cancelled' });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
   };
   

module.exports={
     getUserOrders,
     cancelOrder
}