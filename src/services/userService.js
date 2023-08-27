const OtpModel = require("../models/Otp");
const userModel = require("../models/User");
const userDetail = require("../models/UserDetail");

exports.getUserId = (id) => {
  return userModel.findOne({
    where: {
      uuid: id,
    },
  });
};

exports.createUser = async (data) => {
  console.log("----------");
  console.log(data);

  const { email, first_name, last_name, pic_url, phone_number, status, id } =
    data;

  return await userModel
    .create({
      email: email,
    })
    .then(async (user) => {
      await userDetail.create({
        userId: user.id,
        firstName: first_name,
        lastName: last_name,
        profileImage: pic_url,
        phone: phone_number,
        status: status,
        zoomId: id,
      });
    });
};

exports.getZoomUser = (email) => {
  return userModel.findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: userDetail,
        as: "UserDetail",
        raw: true,
      },
    ],
    raw: true,
  });
};

exports.sayHello = function (id) {
  return userModel.findOne({
    where: {
      uuid: id,
    },
  });
};

exports.verifyOTP = function (mobile, otp) {
  return OtpModel.findOne({
    where: {
      mobile: mobile,
      otp: otp,
    },
  });
};

exports.sendOTP = function (mobile) {
  const otpVal = Math.floor(1000 + Math.random() * 9000);
  return OtpModel.create({ mobile: mobile, otp: otpVal });
};
