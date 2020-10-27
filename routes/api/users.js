const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../../db/models/user')
const asyncHandler = require('express-async-handler')

router.post('./', asyncHandler(async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }

  const user = await User.create(req.body)




}))
