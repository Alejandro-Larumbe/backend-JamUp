const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { secret, expiresIn } = require('../../config').jwtConfig
const User = require('../../db/models/user')

function generateToken(user) {
  const data = {
    name: user.name,
    email: user.email
  }
  const jwtid = uuid();
  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  }
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

    const tokenId = payload.jti;

    try {
      req.user = await User.findByTokenId(tokenId);
    } catch (e) {
      return next(e);
    }

    if (!req.user.isValid()) {
      return next({ status: 404, message: 'session not found' });
    }

    next()
  })
}

const authenticated = [bearerToken(), restoreUser]

module.exports = { generateToken, authenticated };
