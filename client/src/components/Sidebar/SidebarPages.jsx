import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../../pages/DashboardLayout';
import { CgProfile } from 'react-icons/cg';
import { FaChartBar, FaList, FaRegCalendarPlus } from 'react-icons/fa';

const sidebarPages = [
  {
    page: 'Dashboard',
    icon: <FaChartBar />,
    path: '/dashboard',
  },
  {
    page: 'Activities',
    icon: <FaList />,
    path: 'activities',
  },
  {
    page: 'Add Activity',
    icon: <FaRegCalendarPlus />,
    path: 'add-activity',
  },
  {
    page: 'Profile',
    icon: <CgProfile />,
    path: 'profile',
  },
];

const SmallSidebar = () => {
  const { setCurrentTab, setShowModal } = useDashboardContext();

  const handlePageClick = (e) => {
    const page = e.currentTarget.getAttribute('data-page');
    setCurrentTab(page);
    setShowModal(false);
  };

  return (
    <div className='rounded-sm py-4'>
      {sidebarPages.map(({ path, icon, page }) => {
        return (
          <NavLink
            to={path}
            key={page}
            onClick={handlePageClick}
            data-page={page}
          >
            {({ isActive }) => (
              <div
                className={`flex justify-start items-center gap-4 h-10 px-4 w-[80%] rounded-l-sm rounded-r-full ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-gray-300 hover:text-green-600'
                }`}
              >
                {icon}
                <p>{page}</p>
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default SmallSidebar;
