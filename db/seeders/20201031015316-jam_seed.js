'use strict';
const faker = require('faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    let jams = [];

    function host() {
      return Math.floor(Math.random() * 10) + 1
    }
    function time() {
      return Math.floor(Math.random() * 6) -1
    }
    function random6() {
      return Math.floor(Math.random() * 6) + 1
    }

    let descriptions= [
      'On Friday March 11th head down to the MOOMBA Main Stage at Alexandra Gardens to check out our huge night of jamming! Get down from 5PM to jam with the FReeZA Push Start Grand Finalists do their thang before our headliners ALPINE destroy the stage',
      "We're opening up our outside park area for a relaxing afternoon of jamsc, delicious casual food and a few wines! We'll provide the soundtrack to summer as you kick back and enjoy a range of platters and casual style snack food in our outside park area",
      "Join us for a multi-zoned Halloween jamming party at Darkroom and our neighbouring gallery space, Art Hole!",
      "The music you’ve known all these years ‘A Hard Day’s Night’ is a Beatles tribute jam celebrating the music of John Lennon and Paul McCartney. Created by David Day, the music will be jammed by many artists in a variety of musical genres.",
      "Hip-hop/jazz jam headed by rapper Tom Scott, with an enviable cast of musicians — 'a huge learned journey borne of lived experience'",
      "It's been far to long since Albi & The Wolves swept through Hastings and caused a little ruckus at the beloved Common Room. This will be their second jamming session since lockdown and the guys are excited to dust off the cobwebs and kick up some dust.",
      "Can’t make it to the jam this year? We can bring the jam to you. This extravaganza provides the great tastes and sounds of The Pacific allowing you to soak up some Island time. We welcome you in typical Island fashion in a little gem of a spot at the base of Mount Maunganui where the waves crash into the setting sun.",
      "Send this shit-show of a year off in style and start the Summer jamming with our friends HIGH HØØPS, Frank Booker and vinyl powerhouses, Campbell Ngata and Omega B.",
      "Join us and share the wonderful spirit, music and culture of West Africa in our exciting weekend Jam with NZ Drum & Dance Camp.",
      "Britomart Block Party Jam returns with one huge jam to send you into 2021 with Auckland's biggest New Year's Eve festival, right here, in the heart of the CBD!",
      'On Friday March 11th head down to the MOOMBA Main Stage at Alexandra Gardens to check out our huge night of jamming! Get down from 5PM to jam with the FReeZA Push Start Grand Finalists do their thang before our headliners ALPINE destroy the stage',
      "We're opening up our outside park area for a relaxing afternoon of jamsc, delicious casual food and a few wines! We'll provide the soundtrack to summer as you kick back and enjoy a range of platters and casual style snack food in our outside park area",
      "Join us for a multi-zoned Halloween jamming party at Darkroom and our neighbouring gallery space, Art Hole!",
      "The music you’ve known all these years ‘A Hard Day’s Night’ is a Beatles tribute jam celebrating the music of John Lennon and Paul McCartney. Created by David Day, the music will be jammed by many artists in a variety of musical genres.",
      "Hip-hop/jazz jam headed by rapper Tom Scott, with an enviable cast of musicians — 'a huge learned journey borne of lived experience'",
      "It's been far to long since Albi & The Wolves swept through Hastings and caused a little ruckus at the beloved Common Room. This will be their second jamming session since lockdown and the guys are excited to dust off the cobwebs and kick up some dust.",
      "Can’t make it to the jam this year? We can bring the jam to you. This extravaganza provides the great tastes and sounds of The Pacific allowing you to soak up some Island time. We welcome you in typical Island fashion in a little gem of a spot at the base of Mount Maunganui where the waves crash into the setting sun.",
      "Send this shit-show of a year off in style and start the Summer jamming with our friends HIGH HØØPS, Frank Booker and vinyl powerhouses, Campbell Ngata and Omega B.",
      "Join us and share the wonderful spirit, music and culture of West Africa in our exciting weekend Jam with NZ Drum & Dance Camp.",
      "Britomart Block Party Jam returns with one huge jam to send you into 2021 with Auckland's biggest New Year's Eve festival, right here, in the heart of the CBD!",
    ]

    let times = [
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",

    ]
    function country() {
      return Math.floor(Math.random() * 5) -1
    }
    const countries= [
      "Mexico",
      "Mexico",
      "Mexico",
      "Mexico",
      "New Zealand",
      "USA",
      "Japan",
      "Italy",
      "Mexico",
      "New Zealand",
      "USA",
      "Japan",
      "Italy",
      "Mexico",
      "New Zealand",
      "USA",
      "Japan",
      "Italy",
      "Mexico",
      "New Zealand",
    ]

    for (let i = 0; i < 10; i++) {
      jams.push({
        time: times[i],
        date: faker.date.soon(),
        hostId: host(),
        cityId: random6(),
        description: descriptions[i],
        address: faker.address.streetAddress(),
      })
    }

    await queryInterface.bulkInsert('Jam', jams);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Jam', null, {});

  }
};
