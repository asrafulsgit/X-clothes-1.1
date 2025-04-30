
const {CronJob} = require('cron')
const sales_job = new CronJob('* * * * *',()=>{
    const date =  new Date()
    console.log('cron cron cron',date.getMinutes())
},null,false,'Asia/Dhaka')
module.exports = sales_job;