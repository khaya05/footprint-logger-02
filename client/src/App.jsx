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
import { LoginAction } from './pages/Login';

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
        children: [
          {
            index: true,
            element: <DashboardStats />,
          },
          {
            path: 'activities',
            element: <AllActivities />,
          },
          {
            path: 'profile',
            element: <Profile />,
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
  return <RouterProvider router={router} />;
};

export default App;
