const express = require('express');
const router = express.Router();
const users = require('./users')
// fancy way!
// const routes = ['users', 'jams'];

// for (let route of routes) {
//   router.use(`/${route}`, require(`./${route}`));
// }

router.use('/users', users)

module.exports = router;
