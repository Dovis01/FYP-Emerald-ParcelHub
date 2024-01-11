import React from 'react';
import RootLayout from './rootLayout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TopAppBar from "@/components/navigation/topAppBar";
import {SideNavBar} from "@/components/navigation/sideNavBar";
import {useMediaQuery} from "@mui/material";
import {withAuthGuard} from "@/guards/auth-guard";

const SIDE_NAV_WIDTH = 285;

function MainPageLayout({children}) {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    return (
        <RootLayout>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <TopAppBar/>
                {lgUp && (
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: SIDE_NAV_WIDTH,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {width: SIDE_NAV_WIDTH, boxSizing: 'border-box'},
                        }}
                    >
                        <SideNavBar/>
                    </Drawer>
                )}
                <Box component="main" sx={{flexGrow: 1, ml: -21}}>
                    <Toolbar/>
                    <Container maxWidth="xl">
                        {children}
                    </Container>
                </Box>
            </Box>
        </RootLayout>
    )
}

export default withAuthGuard(MainPageLayout);