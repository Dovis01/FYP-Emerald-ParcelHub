import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {useAuthContext} from "@/contexts/auth-context";
import {StationImageDisplay} from "@/components/pageSections/stationManagerComponent/my-station/station-image-display";
import {StationInfoDisplay} from "@/components/pageSections/stationManagerComponent/my-station/station-info-display";

const MyParcelHubStationPage = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    My Parcel Hub Station | {auth.currentUsername}
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
                            My Parcel Hub Station
                        </Typography>
                        <Grid
                            container
                            sx={{minHeight: '500px'}}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <StationImageDisplay/>
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <StationInfoDisplay/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

MyParcelHubStationPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyParcelHubStationPage;
