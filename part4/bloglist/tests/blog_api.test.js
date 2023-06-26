const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('GET /api/blogs', () => {
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
});

describe('POST /api/blogs', () => {
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

    await api.post('/api/blogs').send(blogToAdd).expect(400);
  });
});

describe('DELETE /api/blogs/:id', () => {
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

describe('PUT /api/blogs/:id', () => {
  test('should update blog with valid id', async () => {
    const blogs = await helper.blogsInDB();
    const blogToUpdate = blogs[0];
    const updatedBlog = { title: 'blogToUpdate', author: 'author', url: 'url', likes: -1 };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

    const updatedBlogs = await helper.blogsInDB();
    const likes = updatedBlogs.map((blog) => blog.likes);
    expect(likes).toContain(updatedBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
