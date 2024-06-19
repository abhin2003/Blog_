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
        const blogsArray = await BlogApp.getAllPosts();
        console.log("Blogs Array:", blogsArray);
        setBlogs(blogsArray);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = async (values) => {
    fetchBlogs();
    setError(null); 
    try {
      const result = await BlogApp.createPost(values.title, values.description);
      if (result.ok) {
        const blogsArray = await BlogApp.getAllPosts();
        setBlogs(blogsArray);
      } else {
        setError(result.err);
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Router>
      <main>
        <img src="/logo2.svg" alt="DFINITY logo" style={{ marginBottom: '40px' }} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/blogs" element={<Blogs blogs={blogs} isLoading={isLoading} />} />
          <Route path="/blogs/new" element={<AddBlog handleAddBlog={handleAddBlog} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
