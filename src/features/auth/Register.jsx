import {
  Button,
  IconButton,
  Input,
  Radio,
  Typography,
} from '@material-tailwind/react';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { registerSchema } from '../../utils/validator';
import { useNavigate } from 'react-router';
import { useRegisterUserMutation } from './authApi';
import { toast } from 'react-toastify';

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-[400px] p-4 mx-auto mt-9">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          role: 'user',
          secretKey: '',
        }}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          try {
            await registerUser(values).unwrap();
            toast.success('Registered Successfully');
            navigate(-1);
          } catch (err) {
            toast.error(err?.data?.message || 'Registration failed');
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter your sign-up details
              </Typography>
            </div>

            <div className="flex items-center gap-4">
              <Typography color="gray" className="font-normal whitespace-nowrap">
                Register As:
              </Typography>
              <Radio
                name="role"
                label="User"
                value="user"
                checked={values.role === 'user'}
                onChange={() => setFieldValue('role', 'user')}
              />
              <Radio
                name="role"
                label="Admin"
                value="admin"
                checked={values.role === 'admin'}
                onChange={() => setFieldValue('role', 'admin')}
              />
            </div>

            {values.role === 'admin' && (
              <div>
                <Input
                  onChange={handleChange}
                  value={values.secretKey}
                  label="Secret Key"
                  name="secretKey"
                  type="text"
                />
                {errors.secretKey && touched.secretKey && (
                  <p className="text-red-500 text-sm">{errors.secretKey}</p>
                )}
              </div>
            )}

            <div>
              <Input
                onChange={handleChange}
                value={values.username}
                label="Username"
                type="text"
                name="username"
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div>
              <Input
                onChange={handleChange}
                value={values.email}
                label="Email"
                type="email"
                name="email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="relative flex w-full max-w-[24rem]">
              <Input
                onChange={handleChange}
                value={values.password}
                label="Password"
                type={passVisible ? 'text' : 'password'}
                name="password"
                className="pr-20"
                containerProps={{ className: 'min-w-0' }}
              />
              <IconButton
                onClick={() => setPassVisible(!passVisible)}
                variant="text"
                className="!absolute right-1 top-1 rounded"
                size="sm"
              >
                <i className={`fa ${passVisible ? 'fa-unlock' : 'fa-lock'}`} />
              </IconButton>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm absolute top-full mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              loading={isLoading}
              type="submit"
              className="w-full py-[9px]"
              size="sm"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>

      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{' '}
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          className="font-medium text-gray-900"
        >
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default Register;
