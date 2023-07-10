import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ addBlog, handleNotification, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };

      await blogService.create(newBlog);
      addBlog(newBlog);
      resetInputs();
      handleNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        success: true,
      });
      toggleVisibility();
    } catch (error) {
      handleNotification({
        message: `Unable to create blog`,
        success: false,
      });
    }
  };

  const resetInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
