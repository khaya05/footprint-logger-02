import React from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const Modal = () => {
  const { setShowModal } = useDashboardContext();
  return (
    <div
      className='absolute top-0 left-0 h-[100vh] w-full z-0 bg-black opacity-75'
      onClick={() => setShowModal(false)}
    ></div>
  );
};

export default Modal;
