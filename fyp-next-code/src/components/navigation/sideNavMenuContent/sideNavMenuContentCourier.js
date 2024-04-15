import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import CubeTransparentIcon from '@heroicons/react/24/solid/CubeTransparentIcon';
import MapIcon from '@heroicons/react/24/solid/MapIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";

export const itemsCourier = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authContext = useAuthContext();
    const courierName = authContext.currentUsername.replace(/\s+/g, '-');
    return [
        {
            title: 'Overview',
            path: '/courier/overview',
            icon: (
                <SvgIcon fontSize="medium">
                    <ChartBarIcon/>
                </SvgIcon>
            )
        },
        {
            title: 'My Delivery',
            path: '',
            icon: (
                <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                    <CubeTransparentIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Route And Tasks',
                    path: '/courier/my-delivery/route-and-tasks',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <MapIcon/>
                        </SvgIcon>
                    )
                },
            ]
        },
        {
            title: 'My Truck',
            path: `/courier/my-truck`,
            icon: (
                <SvgIcon fontSize="medium">
                    <LocalShippingIcon/>
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
        }
    ]
};
