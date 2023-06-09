const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCompare = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCompare) {
    return response.status(401).send({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });
  // Question: what is usually returned on login success?
  response.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
