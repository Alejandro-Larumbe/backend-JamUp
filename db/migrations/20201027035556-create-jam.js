'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jam', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      hostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities'
        }
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Jam');
  }
};
