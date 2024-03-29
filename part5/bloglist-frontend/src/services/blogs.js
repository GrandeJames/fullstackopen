import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (blog) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

const update = async (blog) => {
    const newBlog = {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    };

    const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog);
    return response.data;
};

const remove = async (blog) => {
    const response = await axios.delete(`${baseUrl}/${blog.id}`);
    return response.data;
};

const blogs = { getAll, create, setToken, update, remove };
export default blogs;
