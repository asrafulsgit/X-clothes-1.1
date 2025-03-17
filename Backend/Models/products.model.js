const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     brand :{type : String, required :true},
     title :{type : String, required :true},
     images : {type : [], required : true},
     price : {type : String, required :true},
     sizes : {type : [String]},
     colors : {type : [String]},
     discount : {type : String, default : '0'},
     taxes : {type : String,default : '125'},
     stock : {type : Number, required : true},
     category : {type : Number, required : true, min : 101120},
     subcategory : {type : Number, required : true, min : 100},
     description : {type : String, required : true}
})

module.exports = mongoose.model('Product', productSchema)
