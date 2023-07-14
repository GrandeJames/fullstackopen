import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import Login from './components/Login';

function App() {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON);

            setUser(loggedUser);
            blogService.setToken(loggedUser.token);
        }
    }, []);

    const handleUser = (newUser) => {
        setUser(newUser);
    };

    const handleNotification = (newNotification) => {
        setNotification(newNotification);

        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <div>
            {user ? (
                <Blogs
                    user={user}
                    notification={notification}
                    handleUser={handleUser}
                    handleNotification={handleNotification}
                />
            ) : (
                <Login
                    notification={notification}
                    handleNotification={handleNotification}
                    handleUser={handleUser}
                />
            )}
        </div>
    );
}

export default App;
