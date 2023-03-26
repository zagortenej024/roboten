const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define("UserCompany", {
    userCompanyId: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return UserCompany;
};
