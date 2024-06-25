import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form as BootstrapForm, Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container className="add-blog-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
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
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
              <Form className="add-blog-form">
                <BootstrapForm.Group className="mb-3" controlId="title">
                  <BootstrapForm.Label>Title:</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.title}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
                <BootstrapForm.Group className="mb-3" controlId="description">
                  <BootstrapForm.Label>Description:</BootstrapForm.Label>
                  <BootstrapForm.Control
                    as="textarea"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.description}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
                <Button type="submit" disabled={isSubmitting} className="submit-button">
                  Add Blog
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default AddBlog;
