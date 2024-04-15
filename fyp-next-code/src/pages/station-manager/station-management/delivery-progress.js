import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {
    ProgressDataDisplay
} from "@/components/pageSections/stationManagerComponent/station-management/delivery-progress/progress-data-display";
import {
    ProgressMapDisplay
} from "@/components/pageSections/stationManagerComponent/station-management/delivery-progress/progress-map-display";


const StationManagementDeliveryProgress = () => {
    return (
        <>
            <Head>
                <title>
                    Delivery Progress | Station Management
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
                <Container>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Parcels Delivery Progress
                        </Typography>
                        <Box
                            sx={{
                                width: '173.3vh', height: '100%',
                                boxShadow: 20,
                                bgcolor: 'customized.blueLight',
                                overflow: 'hidden',
                                border: 6,
                                borderColor: 'primary.main',
                                borderRadius: 1.2
                            }}
                        >
                            <Grid
                                container
                                spacing={2.5}
                            >
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <ProgressMapDisplay/>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <ProgressDataDisplay/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

StationManagementDeliveryProgress.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default StationManagementDeliveryProgress;
