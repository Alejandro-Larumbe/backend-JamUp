const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator')
const { User } = require('../../db/models')
const asyncHandler = require('express-async-handler');
const { generateToken, authenticated } = require('./security-utils');
// const { UnorderedCollection, PayloadTooLarge } = require('http-errors');
const bcrypt = require('bcrypt')

router.post('/', asyncHandler(async(req, res, next) => {
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

  const  token  = generateToken(user)
  res.status(201).json({
    user: {
      id: user.id
    },
    token
  })
}));

router.get('/:id', asyncHandler(async(req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await User.findByPk(id, {
    attributes: ["username", "firstName", "lastName", "cityId", "instrument", "email", "photoUrl"]

  });

  res.json( user )

}))

module.exports = router;
