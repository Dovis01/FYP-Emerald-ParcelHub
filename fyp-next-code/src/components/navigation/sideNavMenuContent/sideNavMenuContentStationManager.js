import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import InsightsIcon from '@mui/icons-material/Insights';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {SvgIcon} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";
import MagnifyingGlassCircleIcon from "@heroicons/react/24/solid/MagnifyingGlassCircleIcon";
import BuildingStorefrontIcon from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import GetAppIcon from '@mui/icons-material/GetApp';

export const itemsStationManager = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const authContext = useAuthContext();
    const stationManagerName = authContext.currentUsername.replace(/\s+/g, '-');
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
            title: 'Station Management',
            path: '',
            icon: (
                <SvgIcon fontSize="medium">
                    <InsightsIcon/>
                </SvgIcon>
            ),
            children: [
                {
                    title: 'Delivery progress',
                    path: '/station-manager/station-management/delivery-progress',
                    icon: (
                        <SvgIcon fontSize="medium" sx={{mt:-0.2}}>
                            <LocalShippingIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Parcels Storage',
                    path: '/station-manager/station-management/parcels-storage',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <GetAppIcon/>
                        </SvgIcon>
                    )
                },
                {
                    title: 'Parcels Info Query',
                    path: '/station-manager/station-management/parcels-info-query',
                    icon: (
                        <SvgIcon fontSize="medium">
                            <MagnifyingGlassCircleIcon/>
                        </SvgIcon>
                    )
                }
            ]
        },
        {
            title: 'My Parcel Hub Station',
            path: '/station-manager/my-station',
            icon: (
                <SvgIcon fontSize="medium">
                    <BuildingStorefrontIcon/>
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
        }
    ]
};
