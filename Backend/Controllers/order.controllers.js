const { default: mongoose } = require("mongoose");
const Order = require("../Models/Order.model");
const Sales = require("../Models/sales.model");
const Product = require('../Models/products.model');
const { paginationHandler } = require("../utils/product.pagination");
const paymentModel = require("../Models/payment.model");


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
const userOrderCancelOrder = async (req, res) => {
     try {
       const userId = req.userInfo.id;
       const orderId = req.params.orderId;
   
       const order = await Order.findOne({_id: orderId, user: userId });
   
       if (!order || order.orderStatus.toLowerCase() !== 'processing') {
         return res.status(400).send({ 
          success: false, 
          message: 'You cannot cancel this order!' 
        });
       }
       order.orderStatus = 'Cancelled'
       await order.save();
   
       return res.status(200).send({ 
        success: true, message: 'Order cancelled' 
      });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
};

const getAllOrders = async(req,res)=>{
  try {
    const orders = await Order.find().sort({createdAt : -1})
    if(!orders || orders.length === 0) return res.status(404).send({ success: false, message: `no order available!` });
    return res.status(200).send({ 
      success: true, 
      orders,
      message: 'Order successfully fatched' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
}
const getAllOrdersWithPagination = async(req,res)=>{
  try {
    const {page,limit} = req.query;
    const orders = await paginationHandler({model : Order,page,limit})
    if(!orders.documents.length) {
      return res.status(404).send({ 
        success: false, message: `no order available!` 
      });
    }
    return res.status(200).send({ 
      success: true, 
      orders : orders.documents,
      totalPage : orders.totalPage,
      message: 'Order successfully fatched' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
}
const filterOrders = async(req,res)=>{
  try {
    const { orderStatus,page,limit} = req.query; 
    const orders = await paginationHandler({model : Order,query : {orderStatus},page,limit})
    if(!orders.documents.length) {
      return res.status(404).send({ 
        success: false, 
        message: `no order available!` 
      });
    }
    return res.status(200).send({ 
      success: true, 
      orders : orders.documents,
      totalPage : orders.totalPage,
      message: 'Order successfully fatched' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
}


const searchOrders = async(req,res)=>{ 
     try {
       const {search,page,limit} = req.query;
       
       if(!search) return res.status(404).send({ success: false, message: `Please select,Filer items!` });
       const searchQuery = {}
       
       if (search.startsWith('0') || search.startsWith('01')) {
        searchQuery['shippingAddress.phone'] = { $regex: search, $options: 'i' };
       }else{
        searchQuery['shippingAddress.name'] = { $regex: search, $options: 'i' };
      } 
       const orders = await paginationHandler({model : Order,query : searchQuery ,page,limit})
      //  Order.find(searchQuery).limit(10).sort({createdAt : -1})
      
       if(!orders.documents.length) return res.status(404).send({ 
        success: false, 
        message: `no order available!` 
      });
       return res.status(200).send({ 
         success: true, 
         orders : orders.documents,
         totalPage : orders.totalPage,
         message: 'orders successfully fatched' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
   }

const UpdateOrderStatus = async(req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const orderId = req.params.orderId;
    const status = req.query.status;
    if(!orderId) return res.status(400).send({ success: false, message: `order ID is required!` });
    if(!status) return res.status(400).send({ success: false, message: `status is required!` });
    const order = await Order.findByIdAndUpdate(orderId, {orderStatus : status},{ new: true,session })
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ 
        success: false, 
        message: `Order not found!` 
      });
    }
    if(order.isSales && order.orderStatus === 'Delivered'){
      const bulk = order.items.map((item)=>({
        updateOne : {
            filter : {productId : item.product},
            update : {$inc : {quantity : -item.quantity}},
            upsert : false
        }
      }))
      if(bulk.length > 0){
        await Sales.bulkWrite(bulk,{session})
      }
    }
    if(order.orderStatus === 'Cancelled' || order.orderStatus === "Refunded"){
      const bulk = order.items.map((item)=>({
        updateOne : {
            filter : {_id : item.product},
            update : {$inc : {stock : item.quantity}},
            upsert : true
        }
      }))
      if(bulk.length > 0){
        await Product.bulkWrite(bulk,{session})
      }
    }
    
  await session.commitTransaction()
  session.endSession()

   return res.status(200).send({ success: true, message: `Order updated successfully!`, order });
  } catch (error) {
    console.error(error);
    await session.abortTransaction()
    session.endSession()
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
}

const updateSalesEverySunday =async()=>{
  // const session =await mongoose.startSession()
  // try {
  //   await session.startTransaction();
  //   const orders = await Order.find({
  //     orderStatus: 'Delivered',
  //     isSales: false,
  //   }).session(session);

  //   if (!orders.length) {
  //     await session.abortTransaction();
  //     await session.endSession()
  //     return console.log('✅ No eligible orders to process')
  //   };
   
  //   const salesDocs = orders.map(order => ({
  //     insertOne: {
  //       document: {
  //         orderId: order._id,
  //         salesDate:  order.updatedAt,
  //         items: order.items.map(item => ({
  //           productId: item.product,
  //           quantitySold: item.quantity
  //         }))
  //       }
  //     }
  //   }));
  //   const orderUpdates = orders.map(order => ({
  //     updateOne: {
  //       filter: { _id: order._id },
  //       update: { $set: { isSales: true } }
  //     } 
  //   }));
  //   await Sales.bulkWrite(salesDocs, { session });
  //   await Order.bulkWrite(orderUpdates, { session });
  //   await session.commitTransaction();
  //   session.endSession()
  // } catch (error) {
  //     await  session.abortTransaction();
  //     session.endSession()
  //     console.error(error);
  //     throw error;
  // }
  await paymentModel.deleteMany({})
}
updateSalesEverySunday()



const getOrder =async(req,res)=>{
  try {
    const orderId = req.params.orderId;
    if(!orderId) return res.status(400).send({ success: false, message: `order ID is required!` });
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).send({ success: false, message: `Order not found!` });
    }

   return res.status(200).send({ success: true, message: `Order successfully fatched!`, order });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Something broke!" });
  }
} 
   

module.exports={
     getUserOrders,
     userOrderCancelOrder,
     getAllOrders,
     UpdateOrderStatus,
     getOrder,
     filterOrders,
     searchOrders,
     getAllOrdersWithPagination
}