import Blog from "./Blog";
import Notification from "./Notification";

const Blogs = ({ blogs, handleLogout, user, notification }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {notification && (
          <Notification notification={notification}></Notification>
        )}
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
