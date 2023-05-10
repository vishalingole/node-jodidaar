const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, { 
    host: '127.0.0.1', 
    dialect: "mysql", 
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
})

sequelize.authenticate()
.then(() => console.log(process.env.DATABASE_NAME+' Database Connected...'))
.catch(err => console.log('Error:' + err))

module.exports = sequelize

// Making sequelize global varialble
global.sequelize = sequelize