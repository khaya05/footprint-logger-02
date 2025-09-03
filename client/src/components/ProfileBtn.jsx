
import { CgProfile } from 'react-icons/cg';
const ProfileBtn = () => {
  return (
    <div className='flex items-center justify-between gap-1 bg-green-500 p-2 rounded-sm text-white'>
      <p>Tommy</p>
      <CgProfile className='text-[1.5rem]' />
    </div>
  );
};

export default ProfileBtn;
