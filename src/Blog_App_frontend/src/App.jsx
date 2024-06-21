// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Blogs from './Blogs';
import AddBlog from './AddBlog';
import Login from './Login';

async function fetchBlogs() {
  const response = await BlogApp.getAllPosts();
  return response;
}

async function addBlog({ title, description }) {
  const response = await BlogApp.createPost(title, description);
  return response;
}

function App() {
  const queryClient = useQueryClient();
  const [walletAddress, setWalletAddress] = useState(null);

  const { data: blogs, isLoading, error } = useQuery('blogs', fetchBlogs);

  const mutation = useMutation(addBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleAddBlog = async (values) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <Router>
      <main>
        <img src="/logo2.svg" alt="DFINITY logo" style={{ marginBottom: '40px' }} />
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
        {walletAddress ? (
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/blogs" element={<Blogs blogs={blogs} isLoading={isLoading} />} />
            <Route path="/blogs/new" element={<AddBlog handleAddBlog={handleAddBlog} />} />
          </Routes>
        ) : (
          <Login setWalletAddress={setWalletAddress} />
        )}
      </main>
    </Router>
  );
}

export default App;
