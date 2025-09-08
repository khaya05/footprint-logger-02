/* eslint-disable react-refresh/only-export-components */
import { toast } from 'react-toastify';
import { Logo, FormInputElement } from '../components';
import customFetch from '../util/customFetch';
import { redirect, useNavigation, Form, Link } from 'react-router-dom';

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful! Please log in.', {
      position: 'top-right',
      autoClose: 3000,
    });
    return redirect('/login');
  } catch (error) {
    toast.error(
      error?.response?.data?.msg || 'Registration failed. Please try again.',
      {
        position: 'top-right',
        autoClose: 4000,
      }
    );

    return {
      error:
        error?.response?.data?.msg || 'Registration failed. Please try again.',
    };
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className='grid place-items-center h-[100vh]'>
      <div className='form-wrapper'>
        <Logo />
        <h2>Register</h2>
        <Form method='post' className='w-full'>
          <FormInputElement
            name='name'
            placeholder='e.g Tommy'
            defaultValue='tommy'
          />
          <FormInputElement
            name='lastName'
            label='last name'
            placeholder='e.g smith'
            defaultValue='smith'
          />
          <FormInputElement
            name='email'
            placeholder='e.g tommy@email.com'
            defaultValue='tommy@email.com'
          />
          <FormInputElement
            name='password'
            type='password'
            placeholder='password here'
            defaultValue='pass1234'
          />
          <FormInputElement
            name='passwordConfirm'
            label='confirm password'
            type='password'
            placeholder='password here'
            defaultValue='pass1234'
          />
          <button type='submit' className='green-btn' disabled={isSubmitting}>
            {isSubmitting ? 'submitting' : 'submit'}
          </button>
        </Form>

        <p className='text-sm'>
          Already a member?{' '}
          <Link to='/login' className='text-green-500 hover:text-green-600'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
