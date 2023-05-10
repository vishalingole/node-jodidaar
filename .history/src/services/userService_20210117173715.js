
const userModel = require('../models/User')

exports.getUserId = (id) => {
    return userModel.findOne({
      where: {
        uuid: id
      }
    });
 }

 exports.sayHello = function( id) { return userModel.findOne({
    where: {
      uuid: id
    }
  }); }