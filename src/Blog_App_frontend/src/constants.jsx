

import * as Yup from 'yup';


export const initialValues = {
  title: '',
  description: '',
};


export const addBlogSchema = Yup.object().shape({
  title: Yup.string()
    .max(125, 'Title must not exceed 125 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
});
