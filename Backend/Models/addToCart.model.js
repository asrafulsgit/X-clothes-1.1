const mongoose = require('mongoose')

const addToCartSchema = new mongoose.Schema({
     userId :{
          type : mongoose.Schema.Types.ObjectId,
          required : true, 
          ref : 'User'
     },
     productId : {
          type : mongoose.Schema.Types.ObjectId, 
          required : true, 
          ref : 'Product',required : true
     },
     quantity  : {
          type : Number, 
          min : 1,
          default : 1
     },
     color : {
          type : String
     },
     size :{
          type : String
     }
},{timestamps : true})

module.exports = mongoose.model('Cart',addToCartSchema)