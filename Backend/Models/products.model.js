const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     brand :{type : String, required :true},
     title :{type : String, required :true},
     images : {type : [String], required : true},
     price : {type : String, required :true},
     sizes : {type : [String],required : true},
     colors : {type : [String], required : true},
     discount : {type : String, default : '0'},
     taxes : {type : String,default : '125'},
     stock : {type : Number, required : true},
     category : {type : Number, required : true, min : 101120},
     subcategory : {type : Number, required : true, min : 100},
     description : {type : String, required : true}
},{timestamps : true})

productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema)
