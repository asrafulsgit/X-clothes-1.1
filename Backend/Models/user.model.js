const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     avatar : {
          type : String,
          default : 'https://media-hosting.imagekit.io//0fa2cb7b3ec34d93/profile.png?Expires=1835331601&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=mOSwPgjOLQ0gBZ6~rSZCGPuukiIlIBoj-Jv0HJtzue5w3TphnM~7LAEzGG3LP2pBOI90L0H5zf2YBHm-Lfwd4FIsskpDxJ4DuRVJbIZt4IOFYzy7~gxR1lSBzP~QnSmJPhH-VyDWKazP9Q8y8yrA2s4Y-0Bo24BmZ-X2oFoP7SR7f0LrYdA2PITQAcRqqEdINvx436n~MhHXK1vxNrShisa10w-GwAGsZ0ZS2qeq2syLrqSBC7JIdq9pprGm6boUg4hlbSw3EG8vA1yLC~MWo1UaJ-l~IPIgUHpXRbdLHPPckRtPYygiJiNh9Q77zwRK9dMuYtqg1N9-g~1I3a24eg__'
     },
     name :{
          type : String,
          required : [true, 'name is required!'],
          trim : true
     },
     email :{
          type : String,
          required : [true, 'email is required!'],
          unique : true,
          trim : true,
     },
     password :{
          type : String,
          required : [true, 'password is required!'],
          trim : true
     },
     phone : String,
     refreshtoken : String,
     resetpasswordcode : String,
     resetpasswordexpiries : Date
},{timestamps : true})

const User = mongoose.model('User', userSchema);

module.exports = User ;