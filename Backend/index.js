const dotenv = require('dotenv').config();
const mongoConnection = require('./config/mongoConnect')

const server = require('./app')
const startJobs = require('./jobs/jobs.start')

const PORT = process.env.PORT || 3000;

mongoConnection().then(() => {
     server.listen(PORT, () => {
      //  startJobs(); 
       console.log('🚀 Server is running on port', PORT);
     });
   }).catch((err) => {
     console.error('❌ Failed to connect to MongoDB:', err);
     process.exit(1)
   });
    