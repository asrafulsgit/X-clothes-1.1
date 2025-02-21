const jwt = require('jsonwebtoken');

const userAuthentication = async(req,res,next)=>{
     const {accesstoken} =req.cookies;
     
     try {
          if(!accesstoken){
               return res.send('token is not found')
          }
          const verifytoken =  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOEKN)
          req.userInfo = verifytoken;
          next();
          
     } catch (error) {
          return res.status(500).send({
               message : 'somthing broke!',
               success : false
          })
     }
}

module.exports = userAuthentication ;

