/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import {
  BigNavbar,
  BigSidebar,
  BigSidebarBtn,
  Modal,
  SmallNavbar,
  SmallSidebar,
} from '../components';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../util/customFetch';

const DashboardContext = createContext();

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    if (!data) {
      return redirect('/');
    }
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      return redirect('/');
    }
    throw error;
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentTab, setCurrentTab] = useState('');

  return (
    <DashboardContext.Provider
      value={{
        user,
        showModal,
        showSidebar,
        currentTab,
        setShowModal,
        setShowSidebar,
        setCurrentTab,
      }}
    >
      <div className='dashboard-layout bg-green-100'>
        <SmallNavbar />
        {showModal && <Modal />}
        {showModal && <SmallSidebar />}
        <BigNavbar />
        {showSidebar && <BigSidebar />}
        {!showSidebar && <BigSidebarBtn />}
        <div
          className={`bg-green-100 pt-10 px-4 transition-all duration-300 pb-8 ${
            showSidebar ? 'md:translate-x-[300px] md:w-[calc(100vw-300px-1rem)]' : ''
          }`}
        >
          <Outlet context={{ user }} />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
