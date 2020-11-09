const jwt = require('jsonwebtoken');
const db = require('../models/index');
const SECRET_KEY = 'secretkey'


const authMiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    const { email } = jwt.verify(token, SECRET_KEY);
    const user = await db.user.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
}

module.exports = authMiddleware;