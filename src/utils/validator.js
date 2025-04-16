import * as Yup from 'yup';


export const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordValidator = /^((?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,})$/;


export const validCategory = ['Fiction', 'Mystery & Thriller', 'Romance', 'non-fiction','other'];




export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export const updateSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
});


export const registerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string()
    .oneOf(['user', 'admin'], 'Role must be either user or admin')
    .required('Role is required'),
  secretKey: Yup.string().when('role', (role, schema) => {
    return role === 'admin'
      ? schema.required('Secret key is required for admin')
      : schema.notRequired();
  }),
});

export const validImageType = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

export const bookSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  category: Yup.string().oneOf(validCategory, 'Invalid category').required('Category is required'),
  stock: Yup.number().required('Stock is required'),

});


export const cartSchema = Yup.object({
  userId: Yup.string().required(),
  items: Yup.array().of(
    Yup.object({
      bookId: Yup.string().required(),
      title: Yup.string().required(),
      quantity: Yup.number().required()
    })
  ).required(),
});
