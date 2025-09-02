import { useNavigation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type='submit'
      className='bg-green-500 text-white w-full mt-2 rounded-sm capitalize py-1 hover:bg-green-600 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-green-400'
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting' : 'submit'}
    </button>
  );
};

export default SubmitBtn;
