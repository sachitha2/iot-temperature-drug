import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';







import User from './pages/User';
import Login from './pages/Login';
import PatientLogin from './pages/PatientLogin';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import LoginStage from './sections/auth/LoginStage';
import AddAPackage from './pages/AddAPackage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'demographic', element: <Demographics /> },
        { path: 'addAPackage', element: <AddAPackage /> },
        
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/doctor" /> },
        { path: 'login', element: <Login /> },
        { path: 'patient_login', element: <PatientLogin /> },
        { path: 'register', element: <Register/> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
