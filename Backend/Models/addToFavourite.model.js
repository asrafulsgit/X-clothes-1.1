const mongoose = require('mongoose')

const addToFavouriteSchema = new mongoose.Schema({
     userId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User', required : true
     },
     productId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Product', required : true
     }
},{timestamps: true})

const favouriteModel =mongoose.model('Favourite',addToFavouriteSchema)

module.exports= favouriteModel;