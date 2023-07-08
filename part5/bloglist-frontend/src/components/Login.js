const Login = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            name="Username"
            value={props.username}
            onChange={(event) => props.handleUsernameChange(event.target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            name="Password"
            value={props.password}
            onChange={(event) => props.handlePasswordChange(event.target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
