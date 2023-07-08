import Blog from "./Blog";

const Blogs = ({ blogs, handleLogout, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
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
