const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save();
  }
});

test('blogs are returned as JSON and is the correct amount', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(200);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs have an id property', async () => {
  const blogs = await helper.blogsInDB();
  // eslint-disable-next-line no-restricted-syntax
  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test('should insert a blog object to the database', async () => {
  const blogToAdd = { title: 'blogToAdd', author: 'author', url: 'url', likes: 3 };
  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDB = await helper.blogsInDB();
  expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
