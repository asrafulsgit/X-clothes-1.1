const Order = require("../Models/Order.model");
const User = require("../Models/user.model");


const getUserOrders = async(req,res)=>{
     try {
          const userId = req.userInfo.id;

          const isUser = await User.findById(userId)
          if (!isUser) {
               return res.status(404).send({success : false, message: "User is not valid!" });
          }
          const orders = await Order.find({ user : userId}).populate('items.product','title images')
          const paidOrders = orders.filter(item => item.paymentDetails.status === 'Paid'          )
          return res.status(200).send({
               paidOrders,
               success : true,
               message : 'order successfully fetched'
          })
     } catch (error) {
          return res.status(500).send({success : false, message: "somthing broke!" });
     }
}

module.exports={
     getUserOrders
}