import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ addBlog, handleNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      await blogService.create(newBlog);
      addBlog(newBlog);

      setTitle("");
      setAuthor("");
      setUrl("");

      const notification = {
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        success: true,
      };
      handleNotification(notification);
    } catch (error) {
      const notification = {
        message: `title and url are required`,
        success: false,
      };
      handleNotification(notification);
    }
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
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
