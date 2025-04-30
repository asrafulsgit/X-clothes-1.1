const mongoose = require('mongoose')
 
const salesSchema = new mongoose.Schema({
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : true
    }, 
    items : [{ 
        productId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true},
        quantitySold: { type: Number, required: true }
    }],
    salesDate : {type : Date, required: true}
},{timestamps : true}) 

module.exports = mongoose.model('Sales',salesSchema)