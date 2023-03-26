"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    await queryInterface.createTable("Company", {
      companyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    await queryInterface.createTable("UserCompany", {
      userCompanyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "userId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Company",
          key: "companyId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
    await queryInterface.createTable("Absence", {
      absenceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      absenceType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "userId"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("UserCompany");
    await queryInterface.dropTable("Company");
    await queryInterface.dropTable("Absence");
    await queryInterface.dropTable("User");
  }
};
