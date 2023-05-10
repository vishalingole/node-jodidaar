var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')
const userService = require('../src/services/userService');




cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = async () => {
    console.log('running a task every minute');
    await zoomApi.get("https://api.zoom.us/v2/users/", { status: 'active' })
        .then(response => {
            const data = JSON.parse(response);

            data.users.map(user => {

                userService.getZoomUser(user.id)
                    .then(resposne => {
                        console.log(resposne)
                        if (!response) {
                            userService.createUser(user)
                                .then(response => {
                                    console.log(response)
                                })
                                .catch(error => console.log(error))
                        }
                    })

            })
            // response.send(data)
        })
        .catch(error => {
            console.log(error)
            // response.send(error)
        })
}