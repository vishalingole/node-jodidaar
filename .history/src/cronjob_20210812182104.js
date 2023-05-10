var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')



cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = () => {
    console.log('running a task every minute');
    zoomApi.get("https://api.zoom.us/v2/users/", { status: 'inactive' })
        .then(data => {
            console.log(data)
            // response.send(data)
        })
        .catch(error => {
            response.send(error)
        })
}