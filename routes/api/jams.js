const express = require('express');
const router = express.Router();

const { Jam, Jammer, User, City } = require('../../db/models');
const asyncHandler = require('express-async-handler');
const city = require('../../db/models/city');

router.get('/cities', asyncHandler(async(req, res, next) => {
  const cities = await City.findAll({
    attributes: ["id", "name", 'photoUrl']
    // include: {
    //   model: Jam,
    //   include: {
    //     model: User,
    //     as: 'host',
    //     attributes: ['firstName', 'lastName']
    //   }
    // }
  });

  res.json(cities)
}))

// router.get('/cities/:cityId', asyncHandler(async(req, res, next) => {
//   const jams = await Jam.findAll({
//     where: {
//       cityId: req.params.cityId
//     },
//     include: {
//       model: User,
//       as: "host",
//       attributes: ['firstName', 'lastName', 'username']
//     }
//   })
//   res.json(jams)
// }))
router.get('/cities/:id', asyncHandler(async(req, res, next) => {
  const  id  = req.params.id
  const jams = await Jam.findAll({
    where: {
      cityId: id,
    },
    include: [
      {
        model: User,
        as: "host",
        attributes: ['username', 'lastName', 'firstName', 'instrument', 'photoUrl']
      },
      {
        model: User,
        as: "attending",
        attributes: ['username', 'lastName', 'firstName', 'instrument', 'photoUrl']
      },
    ]
  })
  res.json(jams)
}))

router.get('/:id', asyncHandler(async(req, res, next) => {
  const jam = await Jam.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: User,
      as: 'host',
      attributes: ['username', 'lastName', 'firstName', 'instrument', 'photoUrl']
    },
  })
  const { Attending: attending } = await Jam.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: User,
      as: 'attending',
      attributes: ['username', 'lastName', 'firstName', 'instrument', 'photoUrl']
    }
  })

  res.json( { jam, attending} );
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const {
    time,
    date,
    hostId,
    cityId,
    streetAddress,
    description
  } = req.body;

  const jam = await Jam.create({
    time,
    date,
    hostId,
    cityId,
    streetAddress,
    description
  })
  res.status(201).json(jam);
}))

router.patch('/:id', asyncHandler(async (req, res, next) => {
  const id = req.params.jamId

  const {
    time,
    date,
    cityId,
    hostId,
    streetAddress,
    description
  } = req.body;

  await Jam.update({
    id,
    time,
    date,
    hostId,
    cityId,
    streetAddress,
    description
  });

  const token = generateToken(user)
  res.status(201).json({
    user: {
      id: user.id
    },
    token
  })

}))

router.delete('/:id', asyncHandler(async(req, res, next) => {
  const id = req.params.id
  const jam = await Jam.findOne({
    where: {
      id: req.params.id
    }
  })

  await jam.destroy();
  res.json({
    message: `Jam id: ${id} destroyed`
  })

}))

router.get('/:id/users', asyncHandler(async(req, res, next) => {

}))


module.exports = router;
