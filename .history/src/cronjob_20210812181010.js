var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')
const zoomApi = require('../src/zoom-api')



cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = () => {
    console.log('running a task every minute');
}