import { createContext } from 'react';
import { Outlet } from 'react-router-dom';

const ToastContext = createContext()



const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
