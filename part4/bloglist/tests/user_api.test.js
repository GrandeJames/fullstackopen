const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
});

describe('invalid users are not created and return correct status code and error message', () => {
  const validUsername = 'johndoe';
  const validName = 'John Doe';
  const validPassword = '0a34wdw9a20';

  const invalidUsername = 'a';
  const invalidPassword = 'a';

  test('missing username', async () => {
    const userWithMissingUsername = { name: validName, password: validPassword };

    const response = await api
      .post('/api/users')
      .send(userWithMissingUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('missing field');
  });

  test('missing password', async () => {
    const userWithMissingPassword = { username: validUsername, name: validName };

    const response = await api
      .post('/api/users')
      .send(userWithMissingPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('missing field');
  });

  test('invalid username', async () => {
    const userWithInvalidUsername = {
      username: invalidUsername,
      name: validName,
      password: validPassword
    };

    const response = await api
      .post('/api/users')
      .send(userWithInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('insufficient char length');
  });

  test('invalid password', async () => {
    const userWithInvalidPassword = {
      username: invalidUsername,
      name: validName,
      password: invalidPassword
    };

    const response = await api
      .post('/api/users')
      .send(userWithInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('insufficient char length');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
