const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).send({ error: 'missing field' });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: 'insufficient char length' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userToAdd = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await userToAdd.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
