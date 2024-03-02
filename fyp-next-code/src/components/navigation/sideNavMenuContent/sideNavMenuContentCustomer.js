import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import MagnifyingGlassCircleIcon from '@heroicons/react/24/solid/MagnifyingGlassCircleIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsCustomer = () => {
    const authContext = useAuthContext();
    const customerName = authContext.user.roleType === 'Customer' ? authContext.user.username : 'adminRoot';
    return [
        {
            title: 'Overview',
            path: '/customer/overview',
            icon: (
                <SvgIcon fontSize="medium">
                    <ChartBarIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'My Parcels',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <ShoppingBagIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Delivery progress',
                    path: '/customer/my-parcels/delivery-progress',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <LocalShippingIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Information Query',
                    path: '/customer/my-parcels/information-query',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <MagnifyingGlassCircleIcon/>
                        </SvgIcon>
                    )
                }
            ]
        },
        {
            title: 'Account',
            path: `/customer/${customerName}/account`,
            icon: (
                <SvgIcon fontSize="medium">
                    <UserIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'Settings',
            path: `/customer/${customerName}/settings`,
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
