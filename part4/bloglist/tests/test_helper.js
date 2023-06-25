const Blog = require('../models/blog');

const initialBlogs = [
  { title: 'title', author: 'author', url: 'url', likes: 1 },
  { title: 'title2', author: 'author2', url: 'url2', likes: 2 }
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDB };
