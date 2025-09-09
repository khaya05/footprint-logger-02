/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useNavigation } from 'react-router-dom';
import { FormInputElement, SubmitBtn } from '../components';
import { useDashboardContext } from './DashboardLayout';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';

export const updateProfileAction = async ({ request }) => {
  const formData = request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/users/update-user', data);
    toastService.success('Profile updated!');
    return redirect('/dashboard');
  } catch (error) {
    toastService.error(error?.response?.data?.msg || 'Registration failed.');
    return { error: error?.response?.data?.msg };
  }
};

const Profile = () => {
  const { user } = useDashboardContext();
  const { name, lastName, email } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className='outlet'>
      <Form method='post'>
        <h4>Profile</h4>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
          <FormInputElement
            name='name'
            label='first name'
            value='Tommy'
            defaultValue={name}
          />
          <FormInputElement
            name='lastname'
            label='Last name'
            value='marshal'
            defaultValue={lastName}
          />
          <FormInputElement
            name='email'
            value='tommy@email.com'
            defaultValue={email}
          />
        </div>
        <button type='submit' className='green-btn' disabled={isSubmitting}>
          {isSubmitting ? 'updating' : 'update'}
        </button>
      </Form>
    </div>
  );
};

export default Profile;
