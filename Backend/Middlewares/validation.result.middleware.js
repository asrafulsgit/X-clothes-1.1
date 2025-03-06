const {validationResult}=require('express-validator')

const validationMiddleware =(req,res,next)=>{
     const result = validationResult(req);
     if (!result.isEmpty()) {
          return res.status(400).send({
            success: false,
            errors: result.array().map(err => ({
              field: err.path,
              message: err.msg
            }))
          });
        }
     next()
}
module.exports = {
     validationMiddleware
}