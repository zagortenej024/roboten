const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const Absence = sequelize.define("Absence", {
    absenceId: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    absenceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  Absence.associate = function(models) {
    Absence.belongsTo(models.User);
    Absence.belongsTo(models.User);
  };

  return Absence;
};
