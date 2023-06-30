const usersRouter = require('express').Router();
const bcryp = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcryp.hash(password, saltRounds);

  const userToAdd = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await userToAdd.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
