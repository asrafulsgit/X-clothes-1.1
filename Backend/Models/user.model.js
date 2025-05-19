const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     avatar : {
          type : String,
          default : 'https://i.ibb.co/nN9dfh5f/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png'
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
          required : function(){
               return !this.google;
          },
          trim : true
     },
     phone : String,
     role : {type : String, enum : ['user','admin'],default : 'user'},
     refreshtoken : String,
     resetpasswordcode : String,
     resetpasswordexpiries : Date,
     google : {type : Boolean, default : false}
},{timestamps : true}) 

const User = mongoose.model('User', userSchema);

module.exports = User ;