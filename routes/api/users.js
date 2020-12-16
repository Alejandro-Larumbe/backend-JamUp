const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { User, Jammer, Jam } = require('../../db/models')
const asyncHandler = require('express-async-handler');
// const { handleValidationErrors , validateEmailAndPassword } = require('./validation-utils');
const { generateToken, authenticated } = require('./security-utils');
// const { UnorderedCollection, PayloadTooLarge } = require('http-errors');
const bcrypt = require('bcrypt');
// const { Sequelize } = require('sequelize/types');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = new Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad Request.';
    return next(err);
  }
  next();
}

const validateEmailAndPassword = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please enter email address')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters long')
    .isEmail()
    .withMessage('Please enter a valid e-mail address'),
  check('password')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please enter password')
]

const validateUserNameInputs = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a username')
    .isLength({ max: 30 })
    .withMessage('Username must not exceed 30 characters'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your first name')
    .isLength({ max: 25 })
    .withMessage('First Name must not exceed 25 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your last name')
    .isLength({ max: 25 })
    .withMessage('Last Name must not exceed 25 characters'),
]

const validateUserProfileInputs = [
  check('cityId')
    .exists({ checkFalsy: true })
    .withMessage('Please select a city'),
  check('instrument')
    .exists({ checkFalsy: true })
    .withMessage('Please select an instrument')

]

router.post('/', validateUserProfileInputs, validateUserNameInputs, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    password,
    confirmPassword,
    photoUrl
  } = req.body;

  if (confirmPassword !== password) {
    const err = new Error('password and confirm password must match');
    err.status = 401;
    err.title = 'password and confirm password must match';
    err.errors = ['password and confirm password must matchd'];
    return next(err);
  }

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
      id: user.id,
    token
  })
}));

router.post('/token', validateEmailAndPassword, handleValidationErrors, (async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) {
    const err = new Error('User not found');
    err.status = 401;
    err.title = 'User not found';
    err.errors = ['User not found'];
    return next(err);
  }
  const validatePassword = await bcrypt.compare(password, user.hashedPassword.toString())

  console.log('validate password', validatePassword)
  if (!validatePassword) {
    const err = new Error('Invalid Password');
    err.status = 401;
    err.title = 'Invalid Password';
    err.errors = ['Invalid Password'];
    return next(err);
  }

  const token = generateToken(user)
  const id = user.id
  console.log(token)
  res.json({ token, id })

}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await User.findByPk(id, {
    attributes: ["username", "firstName", "lastName", "cityId", "instrument", "email", "photoUrl"]
  });

  res.json({ user })
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id))

  const {
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    // photoUrl
  } = req.body;

  await user.update({
    username,
    firstName,
    lastName,
    cityId,
    instrument,
    email,
    // photoUrl
  })

  // const token = generateToken(user)
  res.status(201).json({
    user: {
      id: user.id
    },
    // token
  })
}));

router.get('/:id/jams', asyncHandler(async (req, res, next) => {
  console.log('id: ', req.params.id)
  id = parseInt(req.params.id)

  const jams = await Jam.findAll({
    where: {
      hostId: req.params.id,
    },
    attributes: ['id', 'time', 'date', 'hostId', 'cityId', 'address', 'description' ],
    include:
    {
      model: User,
      as: 'attending',
      attributes: ["username", "firstName", "lastName", "cityId", "instrument", "email", "photoUrl"]
    },
  })
  console.log(jams)
  res.json({ jams })
}))
// router.get('/:id/jams', asyncHandler(async (req, res, next) => {
//   console.log('id: ', req.params.id)
//   const host = await User.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ['username', 'firstName', 'lastName']
//   })

//   const jams = await Jam.findAll({
//     where: {
//       hostId: req.params.id,
//     },
//   })
//   console.log(jams)
//   res.json({ host, jams })
// }))


router.post('/:id/jammer/:jamId', asyncHandler(async (req, res, next) => {

    userId = parseInt(req.params.id),
    jamId = parseInt(req.params.jamId)


  await Jammer.create( {
    userId,
    jamId
  } )

  res.json({
    message: `serId: ${userId} going to jam ${jamId} `
  })
}))

router.get('/:id/jammer', asyncHandler(async (req, res, next) => {
  console.log('id: ', req.params.id)
  const allJams = await Jammer.findAll({
    where: {
      userId: req.params.id,
    },
    include: {
      model: Jam,
      attributes: ['id', 'time', 'date', 'hostId', 'cityId', 'address', 'description' ],
      include: [
        // {
        //   model: User,
        //   as: 'host',
        //   attributes: ['firstName', 'lastName', 'username']
        // },
        {
          model: User,
          as: 'attending',
          attributes: ['id', "username", "firstName", "lastName", "instrument", "photoUrl"]
        },
      ]
    }
  })
  jams = []
  allJams.map(jam => {
    jams.push(jam.Jam)
  })

  // res.json({ jams })
  res.json( jams )
}))

router.delete('/:id/jammer/:jamId', asyncHandler(async (req, res, next) => {
  userId = parseInt(req.params.id)
  jamId = parseInt(req.params.jamId)

  const jam = await Jammer.findOne({
    where: {
      userId,
      jamId
    }
  })

  await jam.destroy();

  res.json({
    message: `Jam userId: ${userId} jamid: ${jamId} destroyed`
  })
}))
router.get('/:id/jammer/:jamId', asyncHandler(async (req, res, next) => {
  userId = parseInt(req.params.id)
  jamId = parseInt(req.params.jamId)

  const count = await Jammer.findAndCountAll({
    where: {
      userId,
      jamId
    }
  })



  res.json(
    count
  )
}))


module.exports = router;
