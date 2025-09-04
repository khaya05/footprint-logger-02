import { createContext, useContext, useState } from 'react';
import {
  BigNavbar,
  BigSidebar,
  BigSidebarBtn,
  Modal,
  SmallNavbar,
  SmallSidebar,
} from '../components';
import { Outlet } from 'react-router-dom';

const DashboardContext = createContext();

const DashboardLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTab, setCurrentTab] = useState('');

  return (
    <DashboardContext.Provider
      value={{
        showModal,
        showSidebar,
        currentTab,
        setShowModal,
        setShowSidebar,
        setCurrentTab,
      }}
    >
      <div className='dashboard-layout bg-green-100 h-[100vh]'>
        <SmallNavbar />
        {showModal && <Modal />}
        {showModal && <SmallSidebar />}
        <BigNavbar />
        {showSidebar && <BigSidebar />}
        {!showSidebar && <BigSidebarBtn />}
        <div className={`bg-green-100 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5rem)] pt-10 px-4 transition-all duration-300 ${
          showSidebar 
            ? 'md:translate-x-[300px] md:w-[calc(100vw-300px)]' 
            : ''
        }`}>
          <Outlet />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
