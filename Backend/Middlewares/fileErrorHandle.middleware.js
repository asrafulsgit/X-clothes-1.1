
const fileErrorHandlerMiddleware =(err,req,res,next)=>{
     if (err) {
          return res.status(400).send({
               succss: false,
               errors : [
                    { field : 'avatar', message : err.message}
               ]
          });
     }   
     next()  
}

module.exports= {
     fileErrorHandlerMiddleware
}