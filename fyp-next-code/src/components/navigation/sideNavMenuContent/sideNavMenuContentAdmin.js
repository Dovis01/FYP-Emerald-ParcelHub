import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import PresentationChartLineIcon from '@heroicons/react/24/solid/PresentationChartLineIcon';
import IdentificationIcon from '@heroicons/react/24/solid/IdentificationIcon';
import BuildingOffice2Icon from '@heroicons/react/24/solid/BuildingOffice2Icon';
import BuildingStorefrontIcon from '@heroicons/react/24/solid/BuildingStorefrontIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsAdmin = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authContext = useAuthContext();
    const adminName =authContext.currentUsername.replace(/\s+/g, '-');
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
            title: 'People Management',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <IdentificationIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Company Employees',
                    path: '/admin/people-management/company-employees',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <BuildingOffice2Icon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Couriers',
                    path: '/admin/people-management/couriers',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                            <LocalShippingIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Station Managers',
                    path: '/admin/people-management/station-managers',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                            <BuildingStorefrontIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Customers',
                    path: '/admin/people-management/customers',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                            <PersonSearchIcon/>
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
        }
    ];
};
