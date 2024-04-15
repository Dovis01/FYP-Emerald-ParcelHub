import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import MagnifyingGlassCircleIcon from '@heroicons/react/24/solid/MagnifyingGlassCircleIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsCustomer = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authContext = useAuthContext();
    const customerName = authContext.currentUsername.replace(/\s+/g, '-');
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
                    <ViewInArIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Delivery progress',
                    path: '/customer/my-parcels/delivery-progress',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
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
            title: 'My Orders',
            path: `/customer/my-orders`,
            icon: (
                <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                    <ShoppingBagIcon/>
                </SvgIcon>
            )
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
        }
    ]
};
