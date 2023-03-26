const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    companyId: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  Company.associate = function(models) {
    Company.belongsToMany(models.User, { through:models.UserCompany });
  };

  return Company;
};
