import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

test('blog is not expanded by default', () => {
    const blog = {
        id: 'id',
        likes: 0,
        title: 'title',
        url: 'url',
        author: 'author',
        user: {
            username: 'username'
        }
    };

    const user = {
        username: 'username'
    };

    const updateBlog = jest.fn();
    const removeBlog = jest.fn();

    const { container } = render(
        <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
    );

    const element = container.querySelector('.expandedContent');
    expect(element).toHaveStyle('display: none');
});
