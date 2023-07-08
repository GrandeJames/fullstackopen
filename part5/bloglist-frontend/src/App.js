import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password }); // server responds with token, username, and name

      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      blogService.setToken(response.token);
      setUser(response);
      setUsername("");
      setPassword("");
    } catch (error) {
      const notification = {
        message: "wrong username or password",
        success: false,
      };
      handleNotification(notification);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  const handleNotification = (newNotification) => {
    setNotification(newNotification);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <>
      {!user && (
        <Login
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          notification={notification}
        ></Login>
      )}
      {user && (
        <>
          <Blogs
            blogs={blogs}
            user={user}
            handleLogout={handleLogout}
            notification={notification}
          ></Blogs>
          <CreateBlog
            addBlog={addBlog}
            handleNotification={handleNotification}
          ></CreateBlog>
        </>
      )}
    </>
  );
};

export default App;
