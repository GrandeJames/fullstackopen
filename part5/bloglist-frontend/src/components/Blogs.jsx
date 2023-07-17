import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import Notification from './Notification';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';
import blogService from '../services/blogs';

function Blogs({ handleUser, user, notification, handleNotification }) {
    const [blogs, setBlogs] = useState([]);

    const sortBlogs = (unsortedBlogs) => {
        return unsortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    };

    useEffect(() => {
        blogService.getAll().then((blogsFromServer) => {
            setBlogs(sortBlogs(blogsFromServer));
        });
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        handleUser(null);
    };

    const addBlog = (newBlog) => {
        setBlogs(blogs.concat(newBlog));
    };

    const updateBlog = (newBlog) => {
        setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)));
    };

    const removeBlog = (blogToRemove) => {
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
    };

    const addBlogRef = useRef();
    return (
        <div>
            <h2>blogs</h2>
            {notification && <Notification notification={notification} />}
            <div>
                {user.name} logged in{' '}
                <button type="button" onClick={handleLogout}>
                    logout
                </button>
            </div>
            <Togglable buttonLabel="add blog" ref={addBlogRef}>
                <CreateBlogForm
                    toggleVisibility={() => addBlogRef.current.toggleVisibility()}
                    addBlog={addBlog}
                    handleNotification={handleNotification}
                />
            </Togglable>
            <div>
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        removeBlog={removeBlog}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
}

Blogs.propTypes = {
    handleUser: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired,
    user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    notification: PropTypes.shape({
        message: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired
    })
};

Blogs.defaultProps = {
    notification: null
};

export default Blogs;
