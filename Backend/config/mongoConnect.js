const mongoose = require('mongoose');
 
mongoose.connect(process.env.MONGO_DB_URL,{
     serverSelectionTimeoutMS: 5000,
     socketTimeoutMS: 45000,
   })
.then((res)=>{
     console.log('db is connected')
}).catch((err)=> console.log('db is not connect', err))

