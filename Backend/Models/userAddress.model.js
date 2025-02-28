const mongoose = require('mongoose')


const userAddressSchema = new mongoose.Schema({
     house : {type : String},
     state : {type : String},
     zip : {type : String},
     email : {type : String,unique : true, trim : true},
     phone : {type : String,unique : true}
},{timestamps : true})

const address = mongoose.model('Address',userAddressSchema)

module.exports = address;