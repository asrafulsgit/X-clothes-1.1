const {Server}= require('socket.io') 
const cookie = require('cookie') 
let io ;  
    
const initSocket =(server)=>{ 
     io = new Server(server, { 
          cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true, 
            methods: ["GET", "POST","DELETE","PUT"], 
          },
        });
        io.use((socket,next)=>{
          const cookiesFromHeaders = socket.handshake.headers.cookie;
          if (!cookiesFromHeaders) {
               return next(new Error("Cookie is empty!"));
          }
          try {
               const cookies = cookie.parse(cookiesFromHeaders)
               const token = cookies.accesstoken;
               if (!token) {
                    return next(new Error("token missing"));
               }
               next()
          } catch (error) {
               console.log('socket.io connection erro',error)
               return next(new Error("Invalid cookie format"));
          }   
          })

     io.on('connection',(socket)=>{
          console.log('user connected',socket.id)

          socket.on('disconnect',()=>{
               console.log('user disconnected')
          })
     })

     return io;
}
 
const getIo=()=>{
     if(!io){
          throw new Error('socket server is not connect')
     }
     return io;
}

module.exports={initSocket, getIo}