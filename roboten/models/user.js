const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  User.associate = function(models) {
    User.belongsToMany(models.Company, { through:models.UserCompany });
    User.hasMany(models.Absence);
  };

  return User;
};
