import SmallLogo from './SmallLogo';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import ProfileBtn from './ProfileBtn';

const SmallNavbar = () => {
  const { showModal, setShowModal, currentTab } = useDashboardContext();

  return (
    <nav className='md:hidden border-b border-gray-300 flex items-center justify-between p-2 bg-white'>
      <div className=' flex items-center justify-between gap-2'>
        <SmallLogo />
        <h3>{currentTab}</h3>
        <button
          type='button'
          className='hover:text-green-600 hover:cursor-pointer'
          onClick={() => setShowModal(!showModal)}
        >
          {showModal ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      <ProfileBtn />
    </nav>
  );
};

export default SmallNavbar;
