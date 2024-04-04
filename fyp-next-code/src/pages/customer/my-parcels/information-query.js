import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {PickupGoogleMapDisplay} from "@/components/pageSections/customerComponent/my-parcels/info-query/pickup-map-display";
import {ParcelQueryInfoDataDisplay} from "@/components/pageSections/customerComponent/my-parcels/info-query/parcels-queryInfo-data-display";


const MyParcelsInformationQuery = () => {
    return (
        <>
            <Head>
                <title>
                    Information Query | My Parcels
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
                            Parcels Information Query
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
                                    <PickupGoogleMapDisplay />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    <ParcelQueryInfoDataDisplay />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

MyParcelsInformationQuery.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyParcelsInformationQuery;
