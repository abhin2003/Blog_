import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const AddBlogSchema = Yup.object().shape({
  title: Yup.string()
    .max(125, 'Title must not exceed 125 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
});

function AddBlog({ handleAddBlog }) {
  return (
    <div>
      <h2>Add Blog</h2>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={AddBlogSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleAddBlog(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add Blog
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddBlog;
