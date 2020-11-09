const jwt = require('jsonwebtoken');
const User = require('../models/users')

exports.getUserFromToken = (req) => {
  if(req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    return User.findOne({email: jwt.decode(token).email});
  } else {
    throw new Error('No Token found');
  }
}