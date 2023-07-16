import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
    let container;

    beforeEach(() => {
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

        container = render(
            <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
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
});
