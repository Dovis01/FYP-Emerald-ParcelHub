import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {
    ParcelsToStoreDataDisplay
} from "@/components/pageSections/stationManagerComponent/station-management/parcels-to-store-data-display";


const StationParcelsStorage = () => {
    return (
        <>
            <Head>
                <title>
                    Parcels Storage | Station Management
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
                            Parcels Storage
                        </Typography>
                        <Box
                            sx={{
                                width: '173.3vh', height: '100%',
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
                                    <ParcelsToStoreDataDisplay/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

StationParcelsStorage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default StationParcelsStorage;
