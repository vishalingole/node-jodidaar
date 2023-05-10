
const userModel = require('../models/User')
const userDetail = require('../models/UserDetail')

exports.getUserId = (id) => {
  return userModel.findOne({
    where: {
      uuid: id
    }
  });
}

exports.createUser = async (data) => {
 console.log('----------')
  console.log(data)

  const  { email, first_name , last_name } = data;

  return await userModel.create({
    email : email
  }).then(async user => {

    await userDetail.create({
      userId : user.id,
      firstName : first_name,
      lastName : last_name
    })

  })

}

exports.sayHello = function (id) {
  return userModel.findOne({
    where: {
      uuid: id
    }
  });
}