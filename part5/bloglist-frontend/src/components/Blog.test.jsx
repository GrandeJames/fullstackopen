import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import blogService from '../services/blogs';

jest.mock('../services/blogs');

describe('<Blog />', () => {
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
    const blogUser = {
        username: 'username'
    };

    let updateBlog;
    let removeBlog;
    let container;

    // Initializing before each test to reset the variables that should be unique
    beforeEach(() => {
        updateBlog = jest.fn();
        removeBlog = jest.fn();

        container = render(
            <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={blogUser} />
        ).container;
    });

    test('not expanded by default', () => {
        const element = container.querySelector('.expandedContent');
        expect(element).toHaveStyle('display: none');
    });

    test('expanded on view click', async () => {
        const user = userEvent.setup();

        const element = container.querySelector('.expandedContent');
        const viewButton = screen.getByText('view');

        await user.click(viewButton);
        expect(element).not.toHaveStyle('display: none');
    });

    /**
     * Calling the blogService instead of the prop because http request causes a network error
     * Blog handles the click event internally and calls a service
     * Solution: https://github.com/nareshbhatia/react-testing-techniques/blob/main/docs/mocking-an-event-handler.md
     */
    test('blog update is called twice when clicking like twice', async () => {
        const user = userEvent.setup();

        const viewButton = screen.getByText('view');
        await user.click(viewButton);

        const likeButton = screen.getByText('like');
        await user.click(likeButton);
        await user.click(likeButton);

        expect(blogService.update).toHaveBeenCalledTimes(2);
    });
});
