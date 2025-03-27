const jwt = require('jsonwebtoken');

const adminAuthentication = async(req,res,next)=>{
     const {accesstoken} =req.cookies;
     try {
          if(!accesstoken){
               return res.status(404).send({
                    success : false,
                    message : 'token is not found'
               })
          }
          const verifytoken =  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOEKN)
        
          if(verifytoken.role !== 'admin'){
               return res.status(400).send({
                    success : false,
                    message : 'unauthorize user!'
               })
          }
          req.adminInfo = verifytoken;
          next();
     } catch (error) {
          return res.status(500).send({
               message : 'somthing broke!',
               success : false
          })
     }
}

module.exports = adminAuthentication ;

