const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.title && !body.url) {
    return response.status(400).end();
  }

  const user = await User.findOne({});

  const blog = new Blog({
    url: body.url,
    title: body.title,
    likes: body.likes ? body.likes : 0,
    user: user._id
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

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
