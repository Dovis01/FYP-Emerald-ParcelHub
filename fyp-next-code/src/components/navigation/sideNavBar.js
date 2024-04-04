import NextLink from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import PropTypes from 'prop-types';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
    Box,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery
} from '@mui/material';
import {itemsAdmin} from './sideNavMenuContent/sideNavMenuContentAdmin';
import {itemsCourier} from './sideNavMenuContent/sideNavMenuContentCourier';
import {itemsCustomer} from './sideNavMenuContent/sideNavMenuContentCustomer';
import {itemsStationManager} from './sideNavMenuContent/sideNavMenuContentStationManager';
import {SideNavItemButton} from './sideNavItemButton';
import {Scrollbar} from '@/components/customized/scrollbar';
import * as React from "react";
import {useAuthContext} from "@/contexts/auth-context";

export const SideNavBar = (props) => {
    const {open, onClose} = props;
    const authContext = useAuthContext();
    const pathname = usePathname();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const roleMappings = {
        'Customer': 'Welcome, Customer',
        'Courier': 'Parcel Hub Courier',
        'Station-Manager': 'Parcel Hub Station Manager',
        'Admin': 'Parcel Hub Admin'
    };

    let items;
    switch (authContext.user.roleType) {
        case 'Admin':
            items = itemsAdmin();
            break;
        case 'Courier':
            items = itemsCourier();
            break;
        case 'Customer':
            items = itemsCustomer();
            break;
        case 'Station-Manager':
            items = itemsStationManager();
            break;
        default:
            items = itemsCustomer();
            break;
    }

    const content = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': {
                    height: '100%'
                },
                '& .simplebar-scrollbar:before': {
                    background: 'neutral.400'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Box sx={{p: 3}}>
                    <Box
                        component={NextLink}
                        href="/"
                        sx={{
                            display: 'inline-flex',
                            height: 32,
                            width: 32,
                            ml: -2.2
                        }}
                    >
                        <Image
                            src="/assets/logos/Emeral-ParcelHub-Logo2.png"
                            alt="Logo"
                            width={42}
                            height={42}
                            style={{
                                width: 42,
                                height: 42
                            }}
                            priority
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            ml: 2.4,
                            position: 'relative',
                            top: '-14px'
                        }}
                    >
                        <Typography sx={{fontSize: '20.5px', fontWeight: 'bold'}}>
                            Emerald-Parcel Hub
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1.2,
                            ml: -1,
                            width: '106%',
                            p: '13px'
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="subtitle1"
                                sx={{ml: 0.7}}
                            >
                                {authContext.user.roleType === 'Admin' ? authContext.user.adminName : authContext.user.fullName}
                            </Typography>
                            <Typography
                                color="neutral.400"
                                variant="body2"
                                sx={{mb: 0.5, ml: 0.7}}
                            >
                                {roleMappings[authContext.user.roleType]}
                            </Typography>
                            {authContext.user.roleType === 'Courier' ? (
                                <Typography
                                    color="neutral.400"
                                    variant="body2"
                                    sx={{mb: 0.5, ml: 0.7, mt:-0.5}}
                                >
                                    Work Type: {authContext.user.workType}
                                </Typography>
                            ) : null}
                        </div>
                        <SvgIcon
                            fontSize="small"
                            sx={{color: 'neutral.500', mr: -0.8}}
                        >
                            <ChevronUpDownIcon/>
                        </SvgIcon>
                    </Box>
                </Box>
                <Divider sx={{borderColor: 'neutral.700'}}/>
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 1.2
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0
                        }}
                    >
                        {items.map((item) => {
                            const active = item.path ? (pathname === item.path) : false;
                            return (
                                <SideNavItemButton
                                    active={active}
                                    disabled={item.disabled}
                                    external={item.external}
                                    icon={item.icon}
                                    key={item.title}
                                    path={item.path}
                                    title={item.title}
                                    {...(item.children && { children: item.children })}
                                />
                            );
                        })}
                    </Stack>
                </Box>
                <Divider sx={{borderColor: 'neutral.700',mb:2}}/>
                <Box sx={{
                    mb:10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        src="/assets/logos/DisplayPoster.jpg"
                        alt="Full Logo"
                        width={230}
                        height={395}
                        priority
                    />
                </Box>
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 285,
                        borderRight: 0
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 285
                }
            }}
            sx={{zIndex: (theme) => theme.zIndex.appBar + 100}}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

SideNavBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
