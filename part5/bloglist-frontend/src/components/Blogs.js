import Blog from "./Blog";
import Notification from "./Notification";
import Togglable from "./Togglable";
import CreateBlogForm from "./CreateBlogForm";
import { useRef, useEffect, useState } from "react";
import blogService from "../services/blogs";

const Blogs = ({ handleUser, user, notification, handleNotification }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    handleUser(null);
  };

  const handleAddBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  const addBlogRef = useRef();
  return (
    <div>
      <h2>blogs</h2>
      {notification && (
        <Notification notification={notification}></Notification>
      )}
      <div>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="add blog" ref={addBlogRef}>
        <CreateBlogForm
          toggleVisibility={() => addBlogRef.current.toggleVisibility()}
          addBlog={handleAddBlog}
          handleNotification={handleNotification}
        ></CreateBlogForm>
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
