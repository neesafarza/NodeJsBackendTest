const User = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { convertDomainToDTO } = require('../service/userService');

const SECRET_KEY = require('../service/securityService').SECRET_KEY

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email: req.body.email,
      password: hash,
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      typeOfUser: req.body.typeOfUser,
      profession: req.body.profession,
      location: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] }
    });

    const accessToken = jwt.sign({ email }, SECRET_KEY);
    res.json({
      accessToken,
      user: convertDomainToDTO(createdUser)
    }).status(201);
  } catch (e) {
    console.error(e);
    res.send('email already in use').status(400);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne( { email });
    if(!user) {
      res.status(400);
    res.send('Username does not exist');
    }
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
      throw new Error();
    }
    const accessToken = jwt.sign({ email: user.email}, SECRET_KEY);
    res.status(200);
    res.json({
      accessToken,
      user: convertDomainToDTO(user)
    })
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send('User or password incorrect.')
  }
}

exports.getAllSellers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map((user) => convertDomainToDTO(user)));
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(400);
    res.send(JSON.stringify(e))
  }
}