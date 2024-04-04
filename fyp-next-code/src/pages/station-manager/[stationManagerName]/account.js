import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {useAuthContext} from "@/contexts/auth-context";
import {AccountProfile} from "@/components/pageSections/stationManagerComponent/account/account-profile";
import {AccountProfileDetails} from "@/components/pageSections/stationManagerComponent/account/account-profile-details";

const StationManagerAccountPage = () => {
    const auth = useAuthContext();
    return(
        <>
            <Head>
                <title>
                    Account | {auth.currentUsername}
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    pt: 2,
                    width: '100vh',
                    height: '100vh'
                }}
            >
                <Container>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Account
                        </Typography>
                        <Grid
                            container
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile/>
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

StationManagerAccountPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default StationManagerAccountPage;
