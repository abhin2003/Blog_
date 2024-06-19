// Blogs.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Blogs.css'; // Import custom CSS file for styling

function Blogs({ blogs, isLoading }) {
  const navigate = useNavigate();

  return (
    <div className="blogs-container">
      <h2 className="page-title">All Blogs</h2>
      <button onClick={() => navigate('/blogs/new')} className="add-blog-button">
        Add Blog
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="blogs-list">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-entry">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
