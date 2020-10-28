const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator')
const { User, Jammer, Jam } = require('../../db/models')
const asyncHandler = require('express-async-handler');
const { generateToken, authenticated } = require('./security-utils');
// const { UnorderedCollection, PayloadTooLarge } = require('http-errors');
const bcrypt = require('bcrypt');
// const { Sequelize } = require('sequelize/types');

router.post('/', asyncHandler(async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    password,
    photoUrl
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    hashedPassword,
    photoUrl
  })

  const token = generateToken(user)
  res.status(201).json({
    user: {
      id: user.id
    },
    token
  })
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await User.findByPk(id, {
    attributes: ["username", "firstName", "lastName", "cityId", "instrument", "email", "photoUrl"]
  });

  res.json({ user })
}))

router.patch('/:id', asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id)

  const {
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    photoUrl
  } = req.body;

  await user.update({
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    photoUrl
  })

  const token = generateToken(user)
  res.status(201).json({
    user: {
      id: user.id
    },
    token
  })
}));

router.post('/:id/jams/:jamId', asyncHandler(async (req, res, next) => {
  // console.log(req.params)
  const userId = req.params.id;
  const jamId = req.params.jamId;

  const jammer = await Jammer.create({
    userId,
    jamId
  })

  res.status(201).json(jammer)
}));

router.get('/:id/jams', asyncHandler(async (req, res, next) => {
  console.log('id: ', req.params.id)
  const jams = await Jam.findAll({
    // include: {
    //   model: User,
    //   attributes: ['username', 'firstName', 'lastName', 'instrument']
    // },
    where: {
      hostId: req.params.id,
    },
  })
  console.log(jams)
  res.json(jams)
}))

router.get('/:id/jammer', asyncHandler(async (req, res, next) => {
  console.log('id: ', req.params.id)
  const jams = await Jammer.findAll({
    where: {
      userId: req.params.id
    },

    include: {
      model: Jam,

    }

  })
  const hosts = await Promise.all(
    jams.map(async jam => {
    console.log(jam.Jam.hostId)
      const host = await User.findOne({
      where: {
        id: jam.Jam.hostId
      },
      attributes: ['firstName', 'lastName', 'username']

    })
    return host;
  }))
  console.log(hosts)


  res.json({jams, hosts})
}))



module.exports = router;
