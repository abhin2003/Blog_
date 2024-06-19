import React from 'react';
import { useNavigate } from 'react-router-dom';

function Blogs({ blogs, isLoading }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>All Blogs</h2>
      <button onClick={() => navigate('/blogs/new')}>Add Blog</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Blogs;
