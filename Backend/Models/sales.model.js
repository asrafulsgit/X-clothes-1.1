const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('Sales',salesSchema)