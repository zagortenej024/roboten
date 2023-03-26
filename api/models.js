const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const config = require(__dirname + "/config/config.json")[process.env.APP_ENV];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});


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


const UserCompany = sequelize.define("UserCompany", {
  userCompanyId: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});


User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });


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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});


User.hasMany(Absence);
Absence.belongsTo(User);


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = {
  db,
  sequelize,
  User,
  Company,
  UserCompany,
  Absence,
};
