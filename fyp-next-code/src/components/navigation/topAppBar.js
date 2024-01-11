import * as React from 'react';
import Image from 'next/image';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Avatar, Divider, Tooltip} from "@mui/material";

const SIDE_NAV_WIDTH = 285;

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.37),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'neutral.1000',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const TopAppBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                elevation: 4,
                sx: {
                    width: '8.9%',
                    maxWidth: 'none',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 0,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 15,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Avatar/> My Profile
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleMenuClose}>
                Sign Out
            </MenuItem>
        </Menu>
    );


    return (
        <>
            <AppBar
                sx={{
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    backdropFilter: 'blur(7px)',
                    backgroundColor: (theme) => alpha(theme.palette.customized.light, 0.75),
                    zIndex: 100
                }}>
                <Toolbar>
                    <Image
                        src="/Emeral-ParcelHub-Logo2.png"
                        alt="Logo"
                        width={42}
                        height={42}
                        style={{
                            width: 'auto',
                            height: 'auto'
                        }}
                        priority
                    />
                    <Search>
                        <SearchIconWrapper sx={{color:"neutral.1000"}}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" aria-label="show 4 new mails" >
                            <Tooltip title="Email notification" arrow PopperProps={{
                                sx: {
                                    '& .MuiTooltip-tooltip': {
                                        fontSize: '0.78em',
                                    }
                                }
                            }}>
                                <Badge badgeContent={4} color="error">
                                    <MailIcon/>
                                </Badge>
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                        >
                            <Tooltip title="Information notification" arrow PopperProps={{
                                sx: {
                                    '& .MuiTooltip-tooltip': {
                                        fontSize: '0.78em',
                                    }
                                }
                            }}>
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="neutral.900"
                        >
                            <Tooltip title="Account Setting" arrow PopperProps={{
                                sx: {
                                    '& .MuiTooltip-tooltip': {
                                        fontSize: '0.78em',
                                    }
                                }
                            }}>
                                <AccountCircle/>
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    );
}

export default TopAppBar;