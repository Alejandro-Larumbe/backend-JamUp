'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      {
      name: "Mexico City",
      photoUrl: "some"
    },
      {
      name: "Auckland",
      photoUrl: "some"
    },
      {
      name: "Kyoto",
      photoUrl: "some"
    },
      {
      name: "Miami",
      photoUrl: "some"
    },
      {
      name: "New Orleans",
      photoUrl: "some"
    },
      {
      name: "Siena",
      photoUrl: "some"
    },
  ]);

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
