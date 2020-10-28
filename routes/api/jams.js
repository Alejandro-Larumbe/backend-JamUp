const express = require('express');
const router = express.Router();

const { Jam, Jammer, User } = require('../../db/models');
const asyncHandler = require('express-async-handler');

router.post('/', asyncHandler(async (req, res, next) => {
  const {
    time,
    date,
    hostId,
    cityId,
    address,
    description
  } = req.body;

  const jam = await Jam.create({
    time,
    date,
    hostId,
    cityId,
    address,
    description
  })
  res.status(201).json(jam);
}))

router.get('/city/:cityId', asyncHandler(async(req, res, next) => {
  const jams = await Jam.findAll({
    where: {
      cityId: req.params.cityId
    },
    include: {
      model: User,
      attributes: ['firstName', 'lastName', 'username']
    }

  })
  res.json(jams)
}))

router.get('/:id', asyncHandler(async(req, res, next) => {

}))

router.patch('/:id', asyncHandler(async(req, res, next) => {

}))

router.delete('/:id', asyncHandler(async(req, res, next) => {

}))

router.get('/:id/users', asyncHandler(async(req, res, next) => {

}))


module.exports = router;
