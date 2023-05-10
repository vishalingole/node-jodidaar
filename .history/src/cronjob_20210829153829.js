var cron = require('node-cron');
const zoomApi = require('../src/zoom-api')
const userService = require('../src/services/userService');




cron.schedule('* * * * *', () => {
    getUsers();
});


getUsers = async () => {
    console.log('Running a task every minute');
    await zoomApi.get("https://api.zoom.us/v2/users/", { status: 'active' })
        .then(response => {
            const data = JSON.parse(response);

            data.users.map(user => {

                userService.getZoomUser(user.email)
                    .then(response => {
                        console.log(response)
                        if (response)
                            console.log(`user already exist ${response.email}`)
                        else {
                            userService.createUser(user)
                                .then(data => {
                                    console.log('user created')
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