import Notification from "./Notification";
import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ handleUser, handleNotification, notification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      handleUser(user);

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

  return (
    <div>
      <h2>log in to application</h2>
      {notification && (
        <Notification notification={notification}></Notification>
      )}
      <form onSubmit={handleLoginSubmit}>
        <div>
          username
          <input
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
