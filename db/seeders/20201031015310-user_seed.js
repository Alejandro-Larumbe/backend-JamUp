'use strict';
const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    let people = [];

    function random6() {
      return Math.floor(Math.random() * 6) + 1
    }
    function random10() {
      return Math.floor(Math.random() * 11) + 1
    }

    let instruments = ["violin", 'violin', 'cello', "trompet", "guitar", "piano", "sax", "drums", "flute", "viola", "clarinet", "singer"]

    for (let i = 0; i < 20; i++) {
      const hashedPassword = await bcrypt.hash('password', 10)
      people.push({
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

    await queryInterface.bulkInsert('Users', people);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
