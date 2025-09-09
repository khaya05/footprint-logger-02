import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AddActivity,
  AllActivities,
  DashboardLayout,
  DashboardStats,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from './pages';
import { registerAction } from './pages/Register';
// import { LoginAction } from './pages/Login';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastServiceConnector } from './components/ToastServiceConnector';
import ToastContainer from './components/ToastContainer';
import { LoginAction } from './pages/Login';
import { dashboardLoader } from './pages/DashboardLayout';
import { updateProfileAction } from './pages/Profile';
import { activitiesLoader } from './pages/AllActivities';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/Login',
        element: <Login />,
        action: LoginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <DashboardStats />,
          },
          {
            path: 'activities',
            element: <AllActivities />,
            loader: activitiesLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: updateProfileAction,
          },
          {
            path: 'add-activity',
            element: <AddActivity />,
          },
          {
            path: 'Stats',
            element: <Stats />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ToastServiceConnector />
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
};

export default App;
