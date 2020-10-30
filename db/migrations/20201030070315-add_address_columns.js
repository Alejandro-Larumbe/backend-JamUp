'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Jam', "streetAddress", {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ),
      queryInterface.addColumn('Jam', 'state', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),
      queryInterface.addColumn('Jam', 'zipCode', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('Jam', 'country', {
        type: Sequelize.STRING(50),
        allowNull: false,
      }),
      queryInterface.removeColumn('Jam', 'address', {
      }),
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Jams', "streetAddress", { id: Sequelize.INTEGER }),
      queryInterface.removeColumn('Jams', 'city', { id: Sequelize.INTEGER }),
      queryInterface.removeColumn('Jams', 'state', { id: Sequelize.INTEGER }),
      queryInterface.removeColumn('Jams', 'zipCode', { id: Sequelize.INTEGER }),
      queryInterface.removeColumn('Jams', 'country', { id: Sequelize.INTEGER }),
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
