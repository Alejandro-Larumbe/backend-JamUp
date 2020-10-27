const express = require('express');
const router = express.Router();
const users = require('./users')
const jams = require('./jams')

router.use('/users', users)
router.use('/jams', jams)

module.exports = router;
