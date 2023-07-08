import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      setUser(response);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("invalid credential");
    }
  };

  if (user === null) {
    return (
      <Login
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
      ></Login>
    );
  }
  return <Blogs blogs={blogs}></Blogs>;
};

export default App;
