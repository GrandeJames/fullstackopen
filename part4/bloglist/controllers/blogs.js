const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title && !blog.url) {
    response.status(400).end();
    return;
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  const updatedBlog = await Blog.findByIdAndUpdate(id, body);
  response.json(updatedBlog);
});

module.exports = blogsRouter;
