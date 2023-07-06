const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

const getTokenFrom = (request) => {
  const { authorization } = request.headers;
  return authorization && authorization.startsWith('Bearer') // Check to make sure that it's a possible token
    ? authorization.replace('Bearer ', '')
    : null;
};

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.title && !body.url) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

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
