// AddBlog.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AddBlog.css'; // Import custom CSS file for styling

// Define the validation schema using Yup
const AddBlogSchema = Yup.object().shape({
  title: Yup.string()
    .max(125, 'Title must not exceed 125 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
});

function AddBlog({ handleAddBlog }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="add-blog-container">
      <h2 className="page-title">Add Blog</h2>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={AddBlogSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleAddBlog(values); // Wait for handleAddBlog to complete
          setSubmitting(false);
          resetForm();
          navigate('/blogs'); // Redirect to Blogs page
        }}
      >
        {({ isSubmitting }) => (
          <Form className="add-blog-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" className="input" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <Field as="textarea" name="description" className="textarea" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-button">
              Add Blog
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBlog;
