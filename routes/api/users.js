const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../../db/models/user')
const asyncHandler = require('express-async-handler');
const { generateToken } = require('./security-utils');
const { UnorderedCollection, PayloadTooLarge } = require('http-errors');


router.post('./', asyncHandler(async(req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next({ status: 422, errors: errors.array() });
  // }

  const user = await User.create(req.body)

  const hashedPassword = await bcrypt.hash(password, 10);
  const { jti, token } = generateToken(user)
  user.tokenId = jti;
  await user.save();

  res.json({ token, user: user.id })

}))

module.exports = router;
