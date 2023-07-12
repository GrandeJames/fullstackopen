import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog }) => {
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
      </div>
    </div>
  );
};

export default Blog;
