import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
// doctor imports
import Doctor from './pages/doctor/Doctor';
import Diagnoses from './pages/doctor/Diagnoses';
import Allergies from './pages/doctor/Allergies';
import LabTests from './pages/doctor/LabTests';
import Prescriptions from './pages/doctor/Prescriptions';
import Scans from './pages/doctor/Scans';
import Vaccines from './pages/doctor/Vaccines';
import Demographics from './pages/doctor/Demographic';
import Scheduling from './pages/doctor/Scheduling';

// radiographer imports
import Doctor1 from './pages/radiographer/Doctor';
import Demographics1 from './pages/radiographer/Demographic';
import Scans1 from './pages/radiographer/Scans';

// pharmacist imports
import Doctor2 from './pages/pharmacist/Doctor';
import Demographics2 from './pages/pharmacist/Demographic';
import Prescriptions1 from './pages/pharmacist/Prescriptions'

// pathologist imports
import Doctor3 from './pages/pathologist/Doctor';
import Demographics3 from './pages/pathologist/Demographic';
import LabTests1 from './pages/pathologist/LabTests';


import User from './pages/User';
import Login from './pages/Login';
import PatientLogin from './pages/PatientLogin';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import LoginStage from './sections/auth/LoginStage';
import Orders from './pages/doctor/Orders';
import Referrals from './pages/doctor/Referrals';
import AddPatient from './pages/AddPatient';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'doctor',
          element: <Doctor />,
          children: [
            { path: 'diagnoses', element: <Diagnoses /> },
            { path: 'allergies', element: <Allergies /> },
            { path: 'labtests', element: <LabTests /> },
            { path: 'prescriptions', element: <Prescriptions /> },
            { path: 'scans', element: <Scans /> },
            { path: 'orders', element: <Orders /> },
            { path: 'vaccines', element: <Vaccines /> },
            { path: 'referrals', element: <Referrals /> },
            { path: 'demographic', element: <Demographics /> },
          ],
        },
        // { path: 'demographic', element: <Demographics /> },
        { path: 'addPatient', element: <AddPatient /> },
        
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
