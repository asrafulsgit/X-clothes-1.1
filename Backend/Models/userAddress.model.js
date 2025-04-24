const mongoose = require('mongoose')


const userAddressSchema = new mongoose.Schema({
     name : {type : String,required : true},
     zila : {type : String,required : true},
     upazila : {type : String,required : true},
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