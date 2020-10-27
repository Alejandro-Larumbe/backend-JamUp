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

router.post('/:id', asyncHandler(async(req, res, next) => {

}))

module.exports = router;
