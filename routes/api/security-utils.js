const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');

const { secret, expiresIn } = require('../../config').jwtConfig
const { User } = require('../../db/models')

function generateToken(user) {
  const data = {
    id: user.id,
    // email: user.email
  }
  const token = jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn, 10)})
  return token;
}

function restoreUser(req, res, next) {
  const { token } = req;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }
  return jwt.verify(token, secret, null, async(err, jwtPayload) => {
    if(err) {
      err.status = 403;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id)
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      return next({ status: 404, message: 'session not found' });
    }

    next()
  })
}

const authenticated = [bearerToken(), restoreUser]

module.exports = { generateToken, authenticated };
