import React from 'react'
import { useGetUserQuery, useUpdateUserMutation } from '../auth/authApi';
import { Formik } from 'formik';
import { Button, Input, Typography } from '@material-tailwind/react';
import { updateSchema } from '../../utils/validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserToLocal } from '../auth/userSlice';

const ProfileForm = ({ user }) => {
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetUserQuery({
    token: user?.token,
    id: user?.userId
  });

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.message}</h1>

  return (
    <div className=''>
      <Formik
        initialValues={{
          email: data.email,
          username: data.username
        }}
        onSubmit={async (val) => {
          try {
            await updateUser({
              token: user.token,
              id: user.userId,
              body: val
            }).unwrap();
            dispatch(setUserToLocal({ ...user, email: val.email, username: val.username }));
            toast.success('Updated Successfully');

          } catch (err) {

            toast.error(err.data?.message);
          }
        }}
        validationSchema={updateSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Typography variant="h4" color="blue-gray">
                Profile Update
              </Typography>

            </div>


            <div>
              <Input
                onChange={handleChange}
                value={values.username}
                label='Username'
                type='text'
                name='username'
              />
              {errors.username && touched.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
            </div>


            <div>
              <Input
                onChange={handleChange}
                value={values.email}
                label='Email'
                type='email'
                name='email'
              />
              {errors.email && touched.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>






            <Button
              loading={updateLoading}
              type='submit'
              className='w-full py-[9px]' size='sm'>Submit</Button>

          </form>
        )}

      </Formik>




    </div>
  )
}

export default ProfileForm
