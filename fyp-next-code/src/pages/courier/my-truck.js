import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {useAuthContext} from "@/contexts/auth-context";
import {TruckImageDisplay} from "@/components/pageSections/courierComponent/my-truck/truck-image-display";
import {TruckInfoDisplay} from "@/components/pageSections/courierComponent/my-truck/truck-info-display";

const MyTruckPage = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    My Truck | {auth.currentUsername}
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
                            My Truck
                        </Typography>
                        <Grid
                            container
                            sx={{minHeight:'500px'}}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <TruckImageDisplay/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <TruckInfoDisplay/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

MyTruckPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyTruckPage;
