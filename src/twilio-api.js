const Twilio = require("twilio");

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceID = process.env.SERVICE_ID;
const from = process.env.FROM_NUMBER;
const fromWatsapp = process.env.FROM_WHATSAPP_NUMBER;
const Client = new Twilio(accountSID, authToken);

var methods = {};

var methods = {
  sendSMS: function (to, message) {
    return new Promise((resolve, reject) => {
      Client.messages
        .create({
          body: message,
          from: from,
          to: to,
        })
        .then((message) => {
          console.log(message);
          resolve(message);
        })
        .catch((err) => {
          console.log("Error Message", err);
          reject(err);
        });
    });
  },
  watsupMessage: function (to, message) {
    return new Promise((resolve, reject) => {
      Client.messages
        .create({
          body: message,
          from: fromWatsapp,
          to: to,
        })
        .then((message) => {
          console.log(message);
          resolve(message);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  currentDate: function () {
    console.log("Current Date is: " + new Date().toISOString().slice(0, 10));
  },
  sendOTP: function (to) {
    console.log(to);
    return new Promise((resolve, reject) => {
      Client.verify
        .services(serviceID)
        .verifications.create({
          to: "+91" + to,
          channel: "sms",
        })
        .then((verification) => {
          console.log(verification);
          resolve(verification);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyOTP: function (to, otp) {
    return new Promise((resolve, reject) => {
      Client.verify
        .services(serviceID)
        .verificationChecks.create({
          to: "+91" + to,
          code: otp,
        })
        .then((verification_check) => {
          console.log(verification_check);
          resolve(verification_check);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
};

exports.data = methods;
