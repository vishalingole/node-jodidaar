const EducationalProfessionalDetails = require("../models/EducationalProfessionalDetails");
const OtpModel = require("../models/Otp");
const PersonalDetails = require("../models/PersonalDetails");
const ProfileImage = require("../models/ProfileImage");
const userModel = require("../models/User");
const userDetail = require("../models/UserDetail");
const globalMethods = require("../../src/globalMethods");
const FamilyBackground = require("../models/FamilyBackground");
const fs = require("fs");
const User = require("../models/User");
const twilioApi = require("../../src/twilio-api");
const Expectations = require("../models/Expectations");
const RequestDetail = require("../models/RequestDetail");
const OperatorInfo = require("../models/OperatorInfo");

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

exports.getUserId = (id) => {
  return userModel.findOne({
    where: {
      uuid: id,
    },
  });
};

exports.createOperatorUser = async (data) => {
  console.log("----------");
  console.log(data);

  const {
    email,
    firstName,
    lastName,
    middleName,
    mobile,
    status,
    gender,
    address,
    aadhar,
  } = data;

  return await userModel
    .create({
      email: email,
      mobile: mobile,
      userType: "OPERATOR",
      isActive: status,
    })
    .then(async (user) => {
      await OperatorInfo.create({
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        gender: gender,
        aadharNumber: aadhar,
        address: address,
      }).then((data) => {});
    });
};

exports.getOperator = () => {
  return userModel.findAndCountAll({
    include: [
      {
        model: OperatorInfo,
        as: "OperatorInfo",
        // attributes: ["lastName", "gender", "lastName", "email", "mobile"],
        // where: {
        //   ...personDetailFilters,
        // },
      },
    ],
    where: {
      userType: "OPERATOR",
    },
    attributes: ["uuid"],
    raw: true,
    nest: true,
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

  // return twilioApi.data
  //   .watsupMessage(
  //     "whatsapp:+919665988376",
  //     "Welcome to JodiDaar . Please enter four digit code for authentication. " +
  //       otpVal
  //   )
  //   .then((data) => {
  //     console.log("++++", data);
  return OtpModel.create({ mobile: mobile, otp: otpVal });
  // });
};

exports.getSearchProfiles = function (params) {
  console.log(params);
  let page = 0;
  let limit = 10;

  const {
    profileStatus = "",
    educationArea = "",
    nativeDistrict = "",
    occupationPlace = "",
    occupationType = "",
    lookingFor = "",
    displayId = "",
  } = params;

  let userDetail = {
    isActive: profileStatus,
  };

  let personDetail = {
    displayId: displayId,
  };

  let lookingForProfile = {
    maritialStatus: "",
    gender: "",
  };

  if (lookingFor) {
    console.log("----", lookingFor);
    if (lookingFor == "groom") {
      lookingForProfile.maritialStatus = "unmarried";
      lookingForProfile.gender = "male";
    } else if (lookingFor == "bride") {
      lookingForProfile.maritialStatus = "unmarried";
      lookingForProfile.gender = "female";
    } else if (lookingFor == "divorceeGroom") {
      lookingForProfile.maritialStatus = "divorcee";
      lookingForProfile.gender = "male";
    } else if (lookingFor == "divorceeBride") {
      lookingForProfile.maritialStatus = "divorcee";
      lookingForProfile.gender = "female";
    } else if (lookingFor == "window") {
      lookingForProfile.maritialStatus = "window";
      lookingForProfile.gender = "female";
    } else if (lookingFor == "windower") {
      lookingForProfile.maritialStatus = "windower";
      lookingForProfile.gender = "male";
    }
  }

  let educationalDetail = {
    educationArea: educationArea,
    occupationPlace: occupationPlace,
    occupationType: occupationType,
  };

  let familyDetail = {
    nativeDistrict: nativeDistrict,
  };

  let personDetailFilters = globalMethods.cleanObject(personDetail);
  let educationalDetailFilters = globalMethods.cleanObject(educationalDetail);
  let familyDetailFilters = globalMethods.cleanObject(familyDetail);
  let userDetailFilters = globalMethods.cleanObject(userDetail);
  let lookingForProfileFilter = globalMethods.cleanObject(lookingForProfile);

  console.log(educationalDetailFilters);

  return userModel
    .findAndCountAll({
      include: [
        {
          model: PersonalDetails,
          as: "PersonalDetails",
          attributes: ["lastName", "gender", "dob", "displayId", "height"],
          where: {
            ...personDetailFilters,
            ...lookingForProfileFilter,
          },
        },
        {
          model: EducationalProfessionalDetails,
          as: "EducationDetails",
          attributes: [
            "occupationPlace",
            "occupationDetail",
            "occupationType",
            "educationArea",
            "education",
            "income",
            "incomeType",
          ],
          where: {
            ...educationalDetailFilters,
          },
        },
        {
          model: ProfileImage,
          as: "ProfileImage",
          attributes: ["fileName"],
        },

        {
          model: FamilyBackground,
          as: "FamilyBackground",
          attributes: ["nativeDistrict"],
          where: {
            ...familyDetailFilters,
          },
        },
      ],
      attributes: ["uuid"],
      raw: true,
      nest: true,
      where: {
        ...userDetailFilters,
      },
    })
    .then((users) => {
      const cloneObj = Object.assign({}, users);
      cloneObj.rows.map((item) => {
        if (item.ProfileImage && item.ProfileImage.fileName != null) {
          const imagePath = item.ProfileImage.fileName;
          const imageBuffer = fs.readFileSync(imagePath);
          console.log(imageBuffer);
          // Convert the image buffer to base64.
          const base64Image = imageBuffer.toString("base64");
          // Set the Content-Type header to the image type.
          // response.setHeader("Content-Type", "image/jpg");
          item.file = base64Image;
          return item;
        }
        return item;
      });
      const data = getPagingData(cloneObj, page, limit);
      return data;
    });
};

exports.getLatestProfile = function () {
  return userModel
    .findAndCountAll({
      include: [
        {
          model: PersonalDetails,
          as: "PersonalDetails",
          attributes: ["lastName", "gender", "dob", "displayId"],
        },
        {
          model: EducationalProfessionalDetails,
          as: "EducationDetails",
          attributes: [
            "occupationPlace",
            "occupationDetail",
            "occupationType",
            "educationArea",
            "education",
            "income",
            "incomeType",
          ],
        },
        {
          model: ProfileImage,
          as: "ProfileImage",
          attributes: ["fileName"],
        },

        {
          model: FamilyBackground,
          as: "FamilyBackground",
          attributes: ["nativeDistrict"],
        },
      ],
      attributes: ["isActive"],
      raw: true,
      nest: true,
    })
    .then((users) => {
      const cloneObj = Object.assign({}, users);
      cloneObj.rows.map((item) => {
        if (item.ProfileImage && item.ProfileImage.fileName != null) {
          const imagePath = item.ProfileImage.fileName;
          const imageBuffer = fs.readFileSync(imagePath);
          console.log(imageBuffer);
          // Convert the image buffer to base64.
          const base64Image = imageBuffer.toString("base64");
          // Set the Content-Type header to the image type.
          // response.setHeader("Content-Type", "image/jpg");
          item.file = base64Image;
          return item;
        }
        return item;
      });
      // const data = getPagingData(cloneObj, page, limit);
      return cloneObj;
    });
};

exports.getProfile = function (profileId) {
  return userModel
    .findOne({
      include: [
        {
          model: PersonalDetails,
          as: "PersonalDetails",
          attributes: [
            "lastName",
            "gender",
            "dob",
            "displayId",
            "bloodGroup",
            "maritialStatus",
            "diet",
            "personality",
            "height",
            "weight",
            "complexion",
          ],
        },
        {
          model: EducationalProfessionalDetails,
          as: "EducationDetails",
          attributes: [
            "occupationPlace",
            "occupationDetail",
            "occupationType",
            "educationArea",
            "education",
            "income",
            "incomeType",
          ],
        },
        {
          model: ProfileImage,
          as: "ProfileImage",
          attributes: ["fileName"],
        },

        {
          model: FamilyBackground,
          as: "FamilyBackground",
          attributes: [
            "nativeDistrict",
            "parentsResidenceAddress",
            "parentsOccupation",
            "relativeSurname",
            "mamasSurname",
            "familyWealth",
            "nativeTaluka",
            "brother",
            "sister",
            "mother",
            "father",
            "marriedSister",
            "marriedBrother",
            "unMarriedSister",
            "unMarriedBrother",
          ],
        },
        {
          model: Expectations,
          as: "Expectations",
          attributes: [
            "preferredCities",
            "expectedCaste",
            "maxAgeDiffernce",
            "expectedEducation",
            "expectedOccupation",
            "expectedAnnualIncome",
            "divorcee",
            "expectedHeight",
          ],
        },
      ],
      attributes: ["uuid"],
      raw: true,
      nest: true,
      where: {
        uuid: profileId,
      },
    })
    .then((item) => {
      console.log(item);
      if (item.ProfileImage && item.ProfileImage.fileName != null) {
        const imagePath = item.ProfileImage.fileName;
        const imageBuffer = fs.readFileSync(imagePath);
        console.log(imageBuffer);
        // Convert the image buffer to base64.
        const base64Image = imageBuffer.toString("base64");
        // Set the Content-Type header to the image type.
        // response.setHeader("Content-Type", "image/jpg");
        item.file = base64Image;
        return item;
      }
      return item;
    });
  // const data = getPagingData(cloneObj, page, limit);
};

exports.sendProfileDetail = async function (params) {
  const { requestedBy, requestedFor } = params;

  const count = await RequestDetail.count({
    where: {
      requestedBy: requestedBy,
    },
  }).then((data) => data);
  console.log("+++", count);
  if (count < 2) {
    console.log("----");
    return userModel
      .findOne({
        include: [
          {
            model: PersonalDetails,
            as: "PersonalDetails",
            attributes: [
              "firstName",
              "lastName",
              "middleName",
              "gender",
              "dob",
              "displayId",
            ],
          },
        ],
        attributes: ["uuid"],
        raw: true,
        nest: true,
        where: {
          uuid: requestedFor,
        },
        attributes: ["mobile"],
      })
      .then((item) => {
        console.log(item);

        // return twilioApi.data
        // return twilioApi.data
        //   .watsupMessage(
        //     "whatsapp:+919665988376",
        //     "Mobile Number : " +
        //       item.mobile +
        //       "</br> Name : " +
        //       item.PersonalDetails.lastName +
        //       " " +
        //       item.PersonalDetails.firstName +
        //       " " +
        //       item.PersonalDetails.middleName
        //   )
        //   .then((data) => {
        //     console.log("++++", data);

        RequestDetail.create({
          requestedFor: requestedFor,
          requestedBy: requestedBy,
        });

        return {
          responseCode: "200",
          responseType: "SUCCESS",
          responseMessage:
            "Requested details has been sent on your mobile number & Email Id.",
        };
        // });
      });
  } else {
    return {
      responseCode: "200",
      responseType: "SUCCESS",
      responseMessage:
        "Your daily limit has been exceeded. Please try it tommrow.",
    };
  }
};
