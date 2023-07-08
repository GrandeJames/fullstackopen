import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleAddBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  const handleNotification = (newNotification) => {
    setNotification(newNotification);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <>
      {user ? (
        <>
          <Blogs
            blogs={blogs}
            user={user}
            notification={notification}
            handleUser={handleUser}
          ></Blogs>
          <CreateBlog
            addBlog={handleAddBlog}
            handleNotification={handleNotification}
          ></CreateBlog>
        </>
      ) : (
        <Login
          notification={notification}
          handleNotification={handleNotification}
          handleUser={handleUser}
        ></Login>
      )}
    </>
  );
};

export default App;
