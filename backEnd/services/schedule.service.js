const cron = require('node-cron');
const {createBackup}= require('./backup.service');

cron.schedule('* * * * *',()=>{
    console.log('schedule backup running ...');
    createBackup();
    console.log('schedule backup end.')
});