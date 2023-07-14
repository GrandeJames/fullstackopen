import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function CreateBlogForm({ addBlog, handleNotification, toggleVisibility }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const resetInputs = () => {
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newBlog = { title, author, url };

            const createdBlog = await blogService.create(newBlog);
            addBlog(createdBlog);
            resetInputs();
            handleNotification({
                message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
                success: true
            });
            toggleVisibility();
        } catch (error) {
            handleNotification({
                message: `Unable to create blog`,
                success: false
            });
        }
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        title:
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        author:
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        url:
                        <input
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}

CreateBlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired,
    toggleVisibility: PropTypes.func.isRequired
};

export default CreateBlogForm;
