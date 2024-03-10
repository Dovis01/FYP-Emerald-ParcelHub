import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PresentationChartLineIcon from '@heroicons/react/24/solid/PresentationChartLineIcon';
import IdentificationIcon from '@heroicons/react/24/solid/IdentificationIcon';
import BuildingOffice2Icon from '@heroicons/react/24/solid/BuildingOffice2Icon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";


export const itemsAdmin = () => {
    const authContext = useAuthContext();
    const adminName =authContext.currentUsername;
    return [
        {
            title: 'E-commerce Order',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <ShoppingBagIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Overview',
                    path: '/admin/e-commerce-order/overview',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <ChartBarIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Data Simulation',
                    path: '/admin/e-commerce-order/data-simulation',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <PresentationChartLineIcon/>
                        </SvgIcon>
                    )
                }
            ]
        },
        {
            title: 'Our People',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <IdentificationIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Company Employee',
                    path: '/admin/our-people/company-employee',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <BuildingOffice2Icon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Courier',
                    path: '/admin/our-people/courier',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                            <LocalShippingIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Station Manager',
                    path: '/admin/our-people/station-manager',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <BuildingStorefrontIcon/>
                        </SvgIcon>
                    )
                }
            ]
        },
        {
            title: 'Account',
            path: `/admin/${adminName}/account`,
            icon: (
                <SvgIcon fontSize="medium">
                    <UserIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Settings',
            path: `/admin/${adminName}/settings`,
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
    ];
};
