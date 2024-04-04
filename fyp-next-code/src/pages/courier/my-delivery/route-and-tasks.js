import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {useAuthContext} from "@/contexts/auth-context";
import {
    CollectionRouteMapPlanning
} from "@/components/pageSections/courierComponent/my-delivery/collection-routeMap-planning";
import {
    DeliveryRouteMapPlanning
} from "@/components/pageSections/courierComponent/my-delivery/delivery-routeMap-planning";
import {
    CollectionTasksDataDisplay
} from "@/components/pageSections/courierComponent/my-delivery/collection-tasks-data-display";
import {
    DeliveryTasksDataDisplay
} from "@/components/pageSections/courierComponent/my-delivery/delivery-tasks-data-display";


const MyDeliveryRouteAndTasks = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    Route and Tasks | My Delivery
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
                            {auth.user?.workType === 'Collect Parcels' ? "Collection " : 'Delivery '}
                            Route and Tasks
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
                                    {auth.user?.workType === 'Collect Parcels' ?
                                        <CollectionRouteMapPlanning/> :
                                        <DeliveryRouteMapPlanning/>
                                    }
                                </Grid>
                                <Typography variant="h5" sx={{ml: 3, py: 1}}>
                                    {auth.user?.workType === 'Collect Parcels' ? "Collection " : 'Delivery '}
                                    Tasks Details
                                </Typography>
                                <Grid
                                    xs={12}
                                    md={12}
                                    lg={12}
                                >
                                    {auth.user?.workType === 'Collect Parcels' ?
                                        <CollectionTasksDataDisplay/> :
                                        <DeliveryTasksDataDisplay/>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

MyDeliveryRouteAndTasks.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyDeliveryRouteAndTasks;

