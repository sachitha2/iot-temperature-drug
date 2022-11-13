// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Add a Package',
    path: '/dashboard/addAPackage',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Packages',
    path: '/dashboard/packages',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Scan',
    path: '/dashboard/scan',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Document Scan',
    path: '/dashboard/doc-scan',
    icon: getIcon('eva:people-fill'),
  },
  
  // {
  //   title: 'Demographic',
  //   path: '/dashboard/demographic',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'Scheduling',
  //   path: '/dashboard/scheduling',
  //   icon: getIcon('eva:file-text-fill'),
  // },
];

export default navConfig;
