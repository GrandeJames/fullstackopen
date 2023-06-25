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

test('should insert a blog to the database', async () => {
  const blogToAdd = { title: 'blogToAdd', author: 'author', url: 'url', likes: 3 };
  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDB = await helper.blogsInDB();
  expect(blogsInDB).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsInDB.map((blog) => blog.title);
  expect(titles).toContain(blogToAdd.title);
});

test('should have likes property in blog otherwise default to 0', async () => {
  const blogToAdd = { title: 'blogToAdd', author: 'author', url: 'url' };

  const response = await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  if (response.body.likes) {
    expect(response.body.likes).toBeDefined();
  } else {
    expect(response.body.likes).toBe(0);
  }
});

test('should have title and url property in blog', async () => {
  const blogToAdd = { author: 'author', likes: 10 };

  const response = await api.post('/api/blogs').send(blogToAdd).expect(400);
});

describe('viewing a specific blog', () => {
  test('succeeds with valid id', async () => {
    const blogs = await helper.blogsInDB();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const urls = blogsAtEnd.map((blog) => blog.url);
    const blogToDeleteUrl = blogToDelete.url;
    expect(urls).not.toContain(blogToDeleteUrl);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
