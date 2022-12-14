import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddAPackage from './pages/AddAPackage';
import Scan from './pages/Scan';
import DocSan from './pages/DocScan';
import Packages from './pages/Packages';
import CollapsibleTable from './pages/CollapsibleTable';
import SignatureVerify from './pages/SignatureVerify';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'demographic', element: <Demographics /> },
        { path: 'addAPackage', element: <AddAPackage /> },
        { path: 'packages', element: <Packages /> },
        { path: 'scan', element: <Scan /> },
        { path: 'doc-scan', element: <DocSan /> },
        { path: 'table', element: <CollapsibleTable /> },
        { path: 'sign-verify', element: <SignatureVerify/> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register/> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
