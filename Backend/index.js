const dotenv = require('dotenv').config();
const mongoConnection = require('./config/mongoConnect')

const server = require('./app')


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
     console.log('server is running....',PORT)
})
    