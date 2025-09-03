import { useNavigation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type='submit'
      className='green-btn'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting' : 'submit'}
    </button>
  );
};

export default SubmitBtn;
