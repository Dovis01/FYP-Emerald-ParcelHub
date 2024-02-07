import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PresentationChartLineIcon from '@heroicons/react/24/solid/PresentationChartLineIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="medium">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Delivery progress',
    path: '',
    icon: (
      <SvgIcon fontSize="medium">
        <LocalShippingIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Data Analytics',
    path: '',
    icon: (
        <SvgIcon fontSize="medium">
          <PresentationChartLineIcon />
        </SvgIcon>
    )
  },
  {
    title: 'Parcel Management',
    path: '',
    icon: (
      <SvgIcon fontSize="medium">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="medium">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="medium">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'SignIn',
    path: '/auth/signIn',
    icon: (
      <SvgIcon fontSize="medium">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'SignUp',
    path: '/auth/signUp',
    icon: (
      <SvgIcon fontSize="medium">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="medium">
        <XCircleIcon />
      </SvgIcon>
    )
  }
];
