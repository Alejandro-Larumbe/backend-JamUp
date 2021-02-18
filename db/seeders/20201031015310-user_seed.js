'use strict';
const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {



    let avatars = [
      "https://randomuser.me/api/portraits/med/men/75.jpg",
      "https://randomuser.me/api/portraits/med/women/75.jpg",
      "https://randomuser.me/api/portraits/med/men/1.jpg",
      "https://randomuser.me/api/portraits/med/women/1.jpg",
      "https://randomuser.me/api/portraits/med/men/3.jpg",
      "https://randomuser.me/api/portraits/med/women/3.jpg",
      "https://randomuser.me/api/portraits/med/men/4.jpg",
      "https://randomuser.me/api/portraits/med/women/5.jpg",
      "https://randomuser.me/api/portraits/med/men/6.jpg",
      "https://randomuser.me/api/portraits/med/women/6.jpg",
      "https://randomuser.me/api/portraits/med/men/7.jpg",
      "https://randomuser.me/api/portraits/med/women/7.jpg",
      "https://randomuser.me/api/portraits/med/men/8.jpg",
      "https://randomuser.me/api/portraits/med/women/8.jpg",
      "https://randomuser.me/api/portraits/med/men/9.jpg",
      "https://randomuser.me/api/portraits/med/women/9.jpg",
      "https://randomuser.me/api/portraits/med/men/10.jpg",
      "https://randomuser.me/api/portraits/med/women/10.jpg",
      "https://randomuser.me/api/portraits/med/men/11.jpg",
    ]

    function random6() {
      return Math.floor(Math.random() * 6) + 1
    }
    function random10() {
      return Math.floor(Math.random() * 11) + 1
    }

    let instruments = ["violin", 'violin', 'cello', "trumpet", "guitar", "piano", "sax", "drums", "flute", "viola", "clarinet", "singer"]

    const hashedPassword = await bcrypt.hash('password', 10)


    let people = [{

      username: faker.internet.userName(),
      firstName: "Turanga",
      lastName: "Leela",
      cityId: random6(),
      instrument: instruments[random10()],
      email: 'demo@gmail.com',
      hashedPassword: hashedPassword,
      photoUrl: "https://randomuser.me/api/portraits/med/women/11.jpg",
    }];


    for (let i = 0; i < 19; i++) {
      people.push({
        username: faker.internet.userName(),
        firstName: i % 2 === 0 ? faker.name.firstName(0) : faker.name.firstName(1),
        lastName: faker.name.lastName(),
        cityId: random6(),
        instrument: instruments[random10()],
        email: faker.internet.email(),
        hashedPassword: hashedPassword,
        photoUrl: avatars[i]
      })
    }

    await queryInterface.bulkInsert('Users', people);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
