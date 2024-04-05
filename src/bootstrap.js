const Address = require("./models/Address");
const EducationalProfessionalDetails = require("./models/EducationalProfessionalDetails");
const Expectations = require("./models/Expectations");
const FamilyBackground = require("./models/FamilyBackground");
const HoroscopeDetails = require("./models/HoroscopeDetails");
const OperatorInfo = require("./models/OperatorInfo");
const PersonalDetails = require("./models/PersonalDetails");
const ProfileImage = require("./models/ProfileImage");
const User = require("./models/User");
const Bookmark = require("./models/Bookmark");

module.exports = async () => {
  User.hasOne(PersonalDetails, { as: "PersonalDetails", foreignKey: "userId" });
  PersonalDetails.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasOne(Address, { as: "Address", foreignKey: "userId" });
  Address.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasOne(EducationalProfessionalDetails, {
    as: "EducationDetails",
    foreignKey: "userId",
  });
  EducationalProfessionalDetails.belongsTo(User, {
    as: "User",
    foreignKey: "userId",
  });

  User.hasOne(Expectations, { as: "Expectations", foreignKey: "userId" });
  Expectations.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasOne(FamilyBackground, {
    as: "FamilyBackground",
    foreignKey: "userId",
  });
  FamilyBackground.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasOne(HoroscopeDetails, {
    as: "HoroscopeDetails",
    foreignKey: "userId",
  });
  HoroscopeDetails.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasMany(ProfileImage, {
    as: "ProfileImage",
    foreignKey: "userId",
  });
  ProfileImage.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasOne(OperatorInfo, { as: "OperatorInfo", foreignKey: "userId" });
  OperatorInfo.belongsTo(User, { as: "User", foreignKey: "userId" });

  User.hasMany(Bookmark, {
    as: "Bookmark",
    foreignKey: "userId",
  });
  Bookmark.belongsTo(User, { as: "User", foreignKey: "userId" });
};
