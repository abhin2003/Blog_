// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Blogs from './Blogs';
import AddBlog from './AddBlog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsArray = await BlogApp.getAllPosts(); // Replace with actual API call or data fetching
        setBlogs(blogsArray);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = async (values) => {
    setError(null);

    try {
      // Simulate API call to create blog post
      const newBlog = { id: blogs.length + 1, ...values }; // Replace with actual API call
      setBlogs([...blogs, newBlog]);
      // Optionally, navigate back to blog list after adding blog
      // history.push('/blogs'); // if history is available in props
    } catch (error) {
      console.error('Error adding blog:', error);
      setError('Failed to add blog. Please try again.');
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <img src="/logo2.svg" alt="DFINITY logo" className="logo" />
        </header>
        <main className="main-content">
          {error && <div className="error-message">{error}</div>}
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/blogs" element={<Blogs blogs={blogs} isLoading={isLoading} />} />
            <Route
              path="/blogs/new"
              element={<AddBlog handleAddBlog={handleAddBlog} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
