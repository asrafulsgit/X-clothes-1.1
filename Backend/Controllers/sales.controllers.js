const Favorite = require("../Models/addToFavourite.model")
const Product = require("../Models/products.model")
const Sales = require("../Models/sales.model")


const bestSalesProducts=async(req,res)=>{
    try {
        const products = await Sales.aggregate([
            { $unwind: "$items" },
            {$group :{
              _id : '$items.productId',
              totalQuantity : { $sum : '$items.quantitySold'}
            }},
            {$sort : {totalQuantity : -1}},
            {$limit : 6},
            {
              $lookup : {
                from : 'products',
                localField : '_id',
                foreignField : '_id',
                as : 'product'
              }
            },
            {$unwind :'$product'},
            { $project : {
                    _id : 0,
                    totalSold : '$totalQuantity',
                    product : '$product',
            }}
          ])
        if(!products.length){
            return res.status(404).send({
                success : false,
                message : 'No product found!'
            })
        }
        return res.status(200).send({
            success : true,
            products,
            message : 'product successfully fatched'
        })
    } catch (error) {
        console.error(error);
       return res.status(500).send({ 
        success: false, message: "Something broke!" 
       });
    }
}

const pupulerProducts =async(req,res)=>{
  try {
    const products = await Favorite.aggregate([
      {$group : {
        _id : '$productId',
        total : { $sum : 1}
      }},
      {$sort : { total : -1 }},
      {$limit : 10},
      
      {$lookup :{
        from : 'products',
        foreignField : '_id',
        localField : '_id',
        as : 'product'
      }},
      {$unwind : '$product'},
      {$project : {
        _id : 0,
        usersFavourite : '$total',
        product : 1
      }}
    ])
    if(!products.length){
      return res.status(404).send({
          success : false,
          message : 'No product found!'
      })
  }
  return res.status(200).send({
      success : true,
      products,
      message : 'product successfully fatched'
  })
  } catch (error) {
   console.error(error);
   return res.status(500).send({ 
    success: false, message: "Something broke!" 
   });
}
}



// const hello =async()=>{
//   const products = await Sales.aggregate([
//     { $unwind: "$items" },
//     {$group :{
//       _id : '$items.productId',
//       totalQuantity : { $sum : '$items.quantitySold'}
//     }},
//     {$sort : {totalQuantity : -1}},
//     {$limit : 6},
//     {
//       $lookup : {
//         from : 'products',
//         localField : '_id',
//         foreignField : '_id',
//         as : 'product'
//       }
//     },
//     {$unwind :'$product'}, 
//     { $project : {
//       _id : 0,
//       totalSold : '$totalQuantity',
//       product : '$product',
//     }}
//   ])
//   console.log(products)
// }
// hello()

module.exports={
    bestSalesProducts,
    pupulerProducts
}