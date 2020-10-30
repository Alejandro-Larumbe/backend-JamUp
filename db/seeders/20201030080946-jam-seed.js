'use strict';

module.exports = {
  async up: (queryInterface, Sequelize) => {


    for (let i = 0; i < 20; i++) {



      const hashedPassword = await bcrypt.hash('password', 10)
      jams.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        cityId: random6(),
        instrument: instruments[random10()],
        email: faker.internet.email(),
        hashedPassword: hashedPassword,
        photoUrl: faker.internet.avatar()

      })
    }

    await queryInterface.bulkInsert('Jam', jams);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
