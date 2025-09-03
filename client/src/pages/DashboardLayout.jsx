import { createContext, useContext, useState } from 'react';
import {
  BigNavbar,
  BigSidebar,
  BigSidebarBtn,
  Modal,
  SmallNavbar,
  SmallSidebar,
} from '../components';

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
      <div className='dashboard-layout bg-green-50 h-[100vh]'>
        <SmallNavbar />
        {showModal && <Modal />}
        {showModal && <SmallSidebar />}
        <BigNavbar />
        {showSidebar && <BigSidebar />}
        {!showSidebar && <BigSidebarBtn />}
      </div>
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
