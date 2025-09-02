import { Form, Link } from 'react-router-dom';
import Logo from './Logo';
import FormInputElement from './FormInputElement';
import SubmitBtn from './SubmitBtn';

const LoginForm = () => {
  return (
    <div className='form-wrapper'>
      <Logo />
      <h2>Login</h2>
      <Form className='w-full'>
        <FormInputElement name='email' placeholder='e.g tommy@email.com' />
        <FormInputElement name='password' placeholder='password here' />
        <SubmitBtn />
      </Form>
      
      <p className='text-sm'>
        Not a member yet? <Link to='/register' className='text-green-500 hover:text-green-600'>Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
