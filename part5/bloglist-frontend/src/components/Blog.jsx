import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function Blog({ blog, updateBlog, removeBlog, user }) {
    const [expanded, setExpanded] = useState(false);

    const blogStyle = {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#dad7cd',
        margin: 5
    };

    const handleLike = async () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        await blogService.update(updatedBlog);
        updateBlog(updatedBlog);
    };

    const handleBlogRemove = async (blogToRemove) => {
        const removeMessage = `Remove blog ${blogToRemove.title} ${
            blogToRemove.author ? ` by ${blogToRemove.author}` : ''
        }`;

        // eslint-disable-next-line no-alert
        if (window.confirm(removeMessage)) {
            await blogService.remove(blog);
            removeBlog(blog);
        }
    };

    return (
        <div key={blog.id} style={blogStyle}>
            {blog.title} {blog.author}
            <button type="button" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'hide' : 'view'}
            </button>
            <div style={{ display: expanded ? '' : 'none' }}>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes ? blog.likes : 0}
                    <button type="button" onClick={handleLike}>
                        like
                    </button>
                </div>
                <div>{blog.author}</div>
                {blog.user.username === user.username && (
                    <button type="button" onClick={() => handleBlogRemove(blog)}>
                        remove
                    </button>
                )}
            </div>
        </div>
    );
}

Blog.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        author: PropTypes.string,
        user: PropTypes.shape({ username: PropTypes.string.isRequired })
    }).isRequired,
    user: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
};

export default Blog;
