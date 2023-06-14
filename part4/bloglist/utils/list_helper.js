const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    ? blogs.reduce((accumulator, currentBlog) => {
        return accumulator + currentBlog.likes;
      }, 0)
    : 0;
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return undefined;
  }
  const mostLikedBlog = blogs.reduce((currentMostLikedBlog, currentBlog) => {
    if (currentBlog.likes > currentMostLikedBlog.likes) {
      return currentBlog;
    }
    return currentMostLikedBlog;
  });

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return undefined;
  }

  const blogAmt = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(_.keys(blogAmt), (author) => blogAmt[author]);

  return {
    author: topAuthor,
    blogs: blogAmt[topAuthor]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
