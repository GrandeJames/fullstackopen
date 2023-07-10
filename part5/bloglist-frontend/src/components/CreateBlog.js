import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ addBlog, handleNotification, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };

      await blogService.create(newBlog);
      addBlog(newBlog);
      resetCreateBlogInputs();
      handleNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        success: true,
      });
      toggleVisibility();
    } catch (error) {
      handleNotification({
        message: `title and url are required`,
        success: false,
      });
    }
  };

  const resetCreateBlogInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => handleBlogCreate(event)}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
