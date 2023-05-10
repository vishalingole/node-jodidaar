var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')
const userService = require('../src/services/userService');




cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = () => {
    console.log('running a task every minute');
    zoomApi.get("https://api.zoom.us/v2/users/", { status: 'active' })
        .then(response => {
            userService.createUser(response)
            // response.send(data)
        })
        .catch(error => {
            response.send(error)
        })
}