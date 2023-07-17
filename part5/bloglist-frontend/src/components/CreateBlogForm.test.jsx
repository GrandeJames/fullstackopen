import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';
import blogService from '../services/blogs';

jest.mock('../services/blogs');

describe('<CreateBlogForm />', () => {
    let container;
    let mockAddBlog;
    let mockHandleNotification;
    let mockToggleVisibility;

    beforeEach(() => {
        mockAddBlog = jest.fn();
        mockHandleNotification = jest.fn();
        mockToggleVisibility = jest.fn();

        container = render(
            <CreateBlogForm
                addBlog={mockAddBlog}
                handleNotification={mockHandleNotification}
                toggleVisibility={mockToggleVisibility}
            />
        ).container;
    });

    test('blog is created with the right details', async () => {
        const titleInput = container.querySelector('#title-input');
        const authorInput = container.querySelector('#author-input');
        const urlInput = container.querySelector('#url-input');

        const user = userEvent.setup();

        const blog = {
            title: 'test title',
            author: 'test input',
            url: 'test url'
        };

        await user.type(titleInput, blog.title);
        await user.type(authorInput, blog.author);
        await user.type(urlInput, blog.url);

        const createButton = screen.getByText('create');

        await user.click(createButton);

        expect(blogService.create).toBeCalled();
        expect(blogService.create).toBeCalledWith(blog);
    });
});
