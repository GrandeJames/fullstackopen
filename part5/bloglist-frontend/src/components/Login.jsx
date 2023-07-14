import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import loginService from '../services/login';
import blogService from '../services/blogs';

function Login({ handleUser, handleNotification, notification }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            blogService.setToken(user.token);

            handleUser(user);

            setUsername('');
            setPassword('');
        } catch (error) {
            const newNotification = {
                message: 'wrong username or password',
                success: false
            };
            handleNotification(newNotification);
        }
    };

    return (
        <div>
            <h2>log in to application</h2>
            {notification && <Notification notification={notification} />}
            <form onSubmit={handleLoginSubmit}>
                <div>
                    username
                    <input
                        name="Username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        name="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    handleUser: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired,
    notification: PropTypes.shape({
        message: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired
    })
};

Login.defaultProps = {
    notification: null
};

export default Login;
