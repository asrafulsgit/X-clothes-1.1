const { v2 : cloudinary } = require('cloudinary') ;
const fs = require('fs')
const Product = require('../Models/products.model');
const { paginationHandler } = require('../utils/product.pagination');



// cloudinary configuration
cloudinary.config({ 
     cloud_name: 'dbpes24kn', 
     api_key: '527739673541715', 
     api_secret: 'VfkJpNPsu5lyhApYock5Hp1sjPY'
 });

const texAndDiscountCalculation =(parcent,price)=>{
     const amount = (price/100)*parcent
     return Math.floor(amount);
}
// only
//  admin can access 
const addProduct = async (req, res) => {
     
     try {
       const { brand, title, price,taxes,discount, sizes, colors,stock, category,subcategory, description } = req.body.productData;
       const images = await Promise.all(
          req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { resource_type: 'image' })
          .then((result) => {
              return new Promise((resolve, reject) => {
                fs.unlink(file.path, (err) => {
                  if (err) reject(`Failed to delete file: ${err.message}`);
                  else resolve(result.secure_url); 
                });
              });
            })
          )
        );
       const toPrice = Number(price)
       const toTax = texAndDiscountCalculation(toPrice,Number(taxes))
       const product = new Product({
         brand,
         title,
         images,
         price,
         sizes,
         colors,
         stock : Number(stock),
         category: Number(category),
         subcategory: Number(subcategory),
         taxes : toTax,
         discount : Number(discount),
         description,
       });
        
       await product.save();
       res.status(201).send({
         success: true,
         message: 'Product is added',
         product: product,
       });
     } catch (error) {
       res.status(500).send({
         message: 'Something broke!',
       });
     }
};
const deleteProduct = async(req,res)=>{
     const {productId} = req.params;

     try {
          const deleteProduct = await Product.findByIdAndDelete({_id : productId})
          res.send({
               success : true,
               message : deleteProduct
          })
          
     }catch (error) {
              res.status(500).send({ message : 'Somthing broke!'})
     }
}
const updateProduct = async(req,res)=>{
     try {
          const {id,product} = req.body;
          if(!id){
               res.status(404).send({message : 'Product Id required!'})
          }
          const isProduct = await Product.findById(id)
          if(!isProduct){
           return res.status(404).send({message : 'Product not found!'})
          }
          isProduct.set({...product,stock : Number(product.stock)})
          await isProduct.save()
          res.status(200).send({message : 'Product is updated'})
          
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'}) 
     }
}

const getAllProduct = async (req,res) => {
     try {
      const allProduct = await Product.find().sort({createdAt : -1})
      if( !allProduct || allProduct.length <= 0){
          return  res.status(404).send({
                success : false, 
                message : 'product is not Found!'
           })
      }
     return  res.status(200).send({
          success : true, 
          products : allProduct
     })
      
      
     } catch (error) {
        return  res.status(500).send({ 
          success : false,
          message : 'Somthing broke!'
          })
     }
}
const getProductWithPagination = async (req,res) => {
     try {
          const {page,limit}=req.query;
          const products = await paginationHandler({model : Product,page,limit})
      if( !products.documents.length){
          return  res.status(404).send({
                success : false, 
                message : 'product is not Found!'
           })
      }
     return  res.status(200).send({
          success : true, 
          products : products.documents,
          totalPage : products.totalPage
     })
     } catch (error) {
        return  res.status(500).send({ 
          success : false,
          message : 'Somthing broke!'
          })
     }
}

const filterProducts = async(req,res)=>{
  try {
    const {stockStatus,page,limit} = req.query;
    if(!stockStatus) return res.status(404).send({ success: false, message: `Please select,Filer items!` });

    let query = {};
    if (stockStatus === 'true') {
      query = { stock: { $gt: 0 } };
    } else if (stockStatus === 'false') {
      query = { stock: { $lte: 0 } };
    } else {
      return res.status(400).send({ 
          success: false, 
          message: `Invalid stockStatus value!` 
     });
    }
    const products = await paginationHandler({model : Product,page,limit,query})
    if(!products.documents.length) {
     return res.status(404).send({ 
          success: false, 
          message: `no product available!` 
     })
     }
     return res.status(200).send({
          success: true,
          products: products.documents,
          totalPages: products.totalPage,
          message: 'Products successfully fetched',
        });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ 
     success: false, 
     message: "Something broke!" 
});
  }
}

const searchProduct = async(req,res)=>{ 
     try {
       const {search,page,limit} = req.query;
       if(!search) return res.status(404).send({ success: false, message: `Please select,Filer items!` });
       const searchQuery = {}
       if (/^[0-9a-fA-F]{24}$/.test(search)) {
          searchQuery._id = search;
       }else{
          searchQuery.title = { $regex: search, $options: 'i' };
        }
        
       const products = await paginationHandler({model : Product,page,limit,query : searchQuery})
       
        
       if(!products.documents.length ) {
          return res.status(404).send({ 
               success: false, 
               message: `no product available!` 
          });
     }
       return res.status(200).send({ 
         success: true, 
         products : products.documents,
         totalPages : products.totalPage,
         message: 'products successfully fatched' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
   }

const toadaysDeals =async(req,res)=>{ 
     try {
       const products = await Product.find({discount : {$gte : 50}})
                         .sort({discount : -1})
                         .limit(10)
       if( !products || products.length <= 0){
          return  res.status(404).send({
                success : false, 
                message : 'product is not Found!'
           })
      }
       return res.status(200).send({ 
         success: true, 
         products : products,
         message: 'products successfully fatched' 
       });
     } catch (error) {
       console.error(error);
       return res.status(500).send({ success: false, message: "Something broke!" });
     }
   }
  




// random users access 
const getProductByCategory = async(req,res)=>{
     try {
          const {subcategory} = req.body;
          const convertSubCategory = Number(subcategory)
          const isProduct = await Product.find({subcategory : convertSubCategory});
          if(!isProduct || isProduct.length <= 0){
               res.status(404).send({message : 'Product is not available!'})
          }else{
               res.status(200).send({
                    products : isProduct
               })
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}

const getOneProduct = async(req,res)=>{
     try {
          const {productId} = req.params;
          const isProduct = await Product.findById(productId);
          if(!isProduct){
               res.status(404).send({message : 'Product is not found!'})
          }else{
               res.status(200).send({
                    product : isProduct
               })
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}
// get product by categories 
const getProductByCategories = async(req,res)=>{
     try {
          const {categories} = req.body;
          const convertCategories = categories.map(item => Number(item))
          const products = await Product.find({'category' : {$in : convertCategories}})
          if(products.length > 0){
               res.status(200).send({products : products})
          }else{
               res.status(404).send({message : 'this product is not available!'})
          }
     } catch (error) {
          res.status(500).send({ message : 'Somthing broke!'})
     }
}

const newArrivals = async(req,res)=>{
     try {
          const products = await Product.find({stock : { $gt : 0}})
          .sort({createdAt : -1})
          .limit(6)
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


module.exports = {
     addProduct,
     getAllProduct,
     deleteProduct,
     getProductByCategory,
     getOneProduct,
     getProductByCategories,
     updateProduct,
     filterProducts,
     searchProduct,
     getProductWithPagination,
     newArrivals,
     toadaysDeals
} 