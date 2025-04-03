import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { bookSchema, validCategory, validImageType } from '../../utils/validator'
import { useAddBookMutation } from '../book/bookApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AddBook = () => {
  const nav = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();
  const { user } = useSelector((state) => state.userSlice);
  const [imageErr, setImageErr] = useState('');
  const [imageRev, setImageRev] = useState(null);

  return (
    <div className='max-w-[400px] p-4 mx-auto mt-4'>
      <Formik
        initialValues={{
          title: '',
          author: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: null,
        }}
        onSubmit={async (val) => {
          if (imageErr) return;
          if (!user?.token) {
            toast.error('User authentication failed.');
            return;
          }
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('author', val.author);
          formData.append('description', val.description);
          formData.append('price', val.price);
          formData.append('category', val.category);
          formData.append('stock', val.stock);
          formData.append('image', val.image);

          try {
            await addBook({
              body: formData,
              token: user.token
            }).unwrap();
            toast.success('Book Added Successfully');
            nav(-1);
          } catch (err) {
            toast.error(err.data?.message);
          }
        }}
        validationSchema={bookSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, setFieldError }) => (
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <Typography variant="h4" color="blue-gray">
                Add Book
              </Typography>
            </div>

            <main className='space-y-6'>
              <div>
                <Input
                  onChange={handleChange}
                  value={values.title}
                  label='Title'
                  type='text'
                  name='title'
                />
                {errors.title && touched.title && <p className='text-red-500 text-sm'>{errors.title}</p>}
              </div>

              <div>
                <Input
                  onChange={handleChange}
                  value={values.author}
                  label='Author'
                  type='text'
                  name='author'
                />
                {errors.author && touched.author && <p className='text-red-500 text-sm'>{errors.author}</p>}
              </div>

              <div>
                <Input
                  onChange={handleChange}
                  value={values.description}
                  label='Description'
                  type='text'
                  name='description'
                />
                {errors.description && touched.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
              </div>

              <div>
                <Input
                  onChange={handleChange}
                  value={values.price}
                  label='Price'
                  type='number'
                  name='price'
                />
                {errors.price && touched.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
              </div>

              <div>
                <Select
                  label='Choose a Category'
                  value={values.category}
                  onChange={(val) => setFieldValue('category', val)}>
                  {validCategory.map((cat) => <Option key={cat} value={cat}>{cat}</Option>)}
                </Select>
                {errors.category && touched.category && <p className='text-red-500 text-sm'>{errors.category}</p>}
              </div>

              <div>
                <Input
                  onChange={handleChange}
                  value={values.stock}
                  label='Stock'
                  type='number'
                  name='stock'
                />
                {errors.stock && touched.stock && <p className='text-red-500 text-sm'>{errors.stock}</p>}
              </div>

              <div>
                <Input
                  label='Select an Image'
                  type='file'
                  name='image'
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setFieldValue('image', file);
                    if (validImageType.includes(file.type)) {
                      setImageErr(null);
                      setImageRev(URL.createObjectURL(file));
                    } else {
                      setImageErr('Invalid image type');
                      setImageRev(null);
                    }
                  }}
                />
                {imageErr && values.image && <p className='text-red-500 text-sm'>{imageErr}</p>}
                {!imageErr && imageRev && (
                  <div className='mb-1 mt-3'>
                    <img className='w-full h-[150px] object-cover' src={imageRev} alt="img" />
                  </div>
                )}
              </div>

              <Button
                loading={isLoading}
                type='submit'
                className='w-full py-[9px]' size='sm'>Submit</Button>
            </main>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddBook;