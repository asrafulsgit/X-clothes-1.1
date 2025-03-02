const mongoose = require('mongoose')


const userAddressSchema = new mongoose.Schema({
     house : {type : String},
     state : {type : String},
     zip : {type : String},
     email : {type : String,unique : true, trim : true},
     phone : {type : String,unique : true},
     user  : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User',
          required : true
     }
},{timestamps : true})

const Address = mongoose.model('Address',userAddressSchema)

module.exports = Address;