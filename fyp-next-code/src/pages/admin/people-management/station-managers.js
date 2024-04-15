import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {
    AllStationManagersDataDisplay
} from "@/components/pageSections/adminComponent/people-management/all-stationManagers-data-display";

const PeopleManagementStationManagersPage = () => {
    return (
        <>
            <Head>
                <title>
                    People Management | Station Managers
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    pt: 2,
                    height: '100%',
                    minHeight: '100vh'
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Station Managers
                        </Typography>
                        <Grid
                            container
                            spacing={0}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AllStationManagersDataDisplay />
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

PeopleManagementStationManagersPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default PeopleManagementStationManagersPage;
