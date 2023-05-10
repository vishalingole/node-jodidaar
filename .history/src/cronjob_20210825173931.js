var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')
const userService = require('../src/services/userService');

cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = async () => {
    console.log('running a task every minute');
    await zoomApi.get("https://api.zoom.us/v2/users/", { status: 'active' })
        .then(data => {
            console.log(data)
            // response.send(data)
            data.users.map(item => {
                userService.createUser(item)
            })
        })
        .catch(error => {
            // response.send(error)
        })
}