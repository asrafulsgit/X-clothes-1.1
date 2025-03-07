const mongoose = require('mongoose')


const userAddressSchema = new mongoose.Schema({
     house : {type : String,required : true},
     state : {type : String,required : true},
     zip : {type : String,required : true},
     email : {type : String, trim : true},
     phone : {type : String, required : true},
     user  : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User',
          required : true
     }
},{timestamps : true})

const Address = mongoose.model('Address',userAddressSchema)

module.exports = Address;