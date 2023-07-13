import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#dad7cd",
    margin: 5,
  };

  const handleLike = async () => {
    blog.likes++;
    await blogService.update(blog);
    updateBlog(blog);
  };

  const handleBlogRemove = async (blog) => {
    const removeMessage = `Remove blog ${blog.title} ${
      blog.author ? ` by ${blog.author}` : ""
    }`;
    if (window.confirm(removeMessage)) {
      await blogService.remove(blog);
      removeBlog(blog);
    }
  };

  return (
    <div key={blog.id} style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={() => setExpanded(!expanded)}>
        {expanded ? "hide" : "view"}
      </button>
      <div style={{ display: expanded ? "" : "none" }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes ? blog.likes : 0}
          <button type="button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {blog.user.username === user.username && (
          <button type="button" onClick={() => handleBlogRemove(blog)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
