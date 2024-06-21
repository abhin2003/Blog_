// AddBlog.jsx

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form as BootstrapForm } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import './AddBlog.css';
import { initialValues, addBlogSchema } from './constants';

function AddBlog({ handleAddBlog }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(handleAddBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  return (
    <div className="add-blog-container">
      <h2 className="page-title">Add Blog</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={addBlogSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await mutation.mutateAsync(values);
            resetForm();
            navigate('/blogs');
          } catch (error) {
            console.error('Error adding blog:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="add-blog-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <Field 
                type="text" 
                name="title" 
                className={`input ${touched.title && errors.title ? 'is-invalid' : ''}`} 
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.title}
              </BootstrapForm.Control.Feedback>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <Field 
                as="textarea" 
                name="description" 
                className={`textarea ${touched.description && errors.description ? 'is-invalid' : ''}`} 
              />
              <BootstrapForm.Control.Feedback type="invalid">
                {errors.description}
              </BootstrapForm.Control.Feedback>
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
