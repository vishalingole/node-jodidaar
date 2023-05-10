
const userModel = require('../models/User')

exports.getUserId = (id) => {
  return userModel.findOne({
    where: {
      uuid: id
    }
  });
}

exports.createUser = (data) => {
 console.log('----------')
  console.log(data)
  return true;
}

exports.sayHello = function (id) {
  return userModel.findOne({
    where: {
      uuid: id
    }
  });
}