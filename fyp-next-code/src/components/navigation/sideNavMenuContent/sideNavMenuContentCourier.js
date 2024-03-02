import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PresentationChartLineIcon from '@heroicons/react/24/solid/PresentationChartLineIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsCourier = () => {
    const authContext = useAuthContext();
    const courierName = authContext.user.roleType === 'Courier' ? authContext.user.username : 'adminRoot';
    return [
        {
            title: 'Overview',
            path: '/',
            icon: (
                <SvgIcon fontSize="medium">
                    <ChartBarIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Delivery progress',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <LocalShippingIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Data Analytics',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <PresentationChartLineIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Parcel Management',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <ShoppingBagIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Account',
            path: `/courier/${courierName}/account`,
            icon: (
                <SvgIcon fontSize="medium">
                    <UserIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Settings',
            path: `/courier/${courierName}/settings`,
            icon: (
                <SvgIcon fontSize="medium">
                    <CogIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'SignIn',
            path: '/auth/signIn',
            icon: (
                <SvgIcon fontSize="medium">
                    <LockClosedIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'SignUp',
            path: '/auth/signUp',
            icon: (
                <SvgIcon fontSize="medium">
                    <UserPlusIcon/>
                </SvgIcon>
            )
        }
    ]
};
