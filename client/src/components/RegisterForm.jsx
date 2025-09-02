import { Form, Link } from "react-router-dom";
import Logo from "./Logo";
import FormInputElement from "./FormInputElement";
import SubmitBtn from "./SubmitBtn";


const RegisterForm = () => {
  return (
    <div className='form-wrapper'>
      <Logo />
      <h2>Register</h2>
      <Form className='w-full'>
        <FormInputElement name='name' placeholder='e.g Tommy' />
        <FormInputElement
          name='lastname'
          label='last name'
          placeholder='e.g smith'
        />
        <FormInputElement name='email' placeholder='e.g tommy@email.com' />
        <FormInputElement name='password' placeholder='password here' />
        <FormInputElement
          name='passwordConfirm'
          label='confirm password'
          type='password'
          placeholder='password here'
        />
        <SubmitBtn />
      </Form>

      <p className='text-sm'>
        Already a member?{' '}
        <Link to='/dashboard' className='text-green-500 hover:text-green-600'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
