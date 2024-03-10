import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PresentationChartLineIcon from '@heroicons/react/24/solid/PresentationChartLineIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsStationManager = () => {
    const authContext = useAuthContext();
    const stationManagerName = authContext.currentUsername;
    return [
        {
            title: 'Overview',
            path: '/station-manager/overview',
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
                <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
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
                    <ViewInArIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Account',
            path: `/station-manager/${stationManagerName}/account`,
            icon: (
                <SvgIcon fontSize="medium">
                    <UserIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Settings',
            path: `/station-manager/${stationManagerName}/settings`,
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
