import Head from 'next/head';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {Box, Grid, Paper} from "@mui/material";
import {OverviewAwaitingCollection} from "@/components/pageSections/courierComponent/overview/overview-awaiting-collection";
import {OverviewInTruck} from "@/components/pageSections/courierComponent/overview/overview-in-truck";
import {OverviewPickupProgress} from "@/components/pageSections/courierComponent/overview/overview-pickup-progress";
import {OverviewTotalProfit} from "@/components/pageSections/courierComponent/overview/overview-total-profit";
import {OverviewTrends} from "@/components/pageSections/courierComponent/overview/overview-trends";
import {OverviewDeliveryTask} from "@/components/pageSections/courierComponent/overview/overview-delivery-task";
import {OverviewLatestInventory} from "@/components/pageSections/courierComponent/overview/overview-latest-inventory";
import {OverviewLatestRecords} from "@/components/pageSections/courierComponent/overview/overview-latest-records";
import {chartSeriesTrend, order, products} from "@/dataSimulation/overviewData";
import {useAuthContext} from "@/contexts/auth-context";

const CourierOverviewPage = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    Overview | {auth.currentUsername}
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    width: '112.5%',
                    py: 2.7,
                    maxWidth: '250vh'
                }}
            >
                <Grid container spacing={2} justifyContent="space-evenly">
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewAwaitingCollection
                                difference={12}
                                positive
                                sx={{height: '100%'}}
                                value="$24k"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewInTruck
                                difference={16}
                                positive={false}
                                sx={{height: '100%'}}
                                value="6"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewPickupProgress
                                sx={{height: '100%'}}
                                value={75.5}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewTotalProfit
                                difference={19}
                                positive
                                sx={{height: '100%'}}
                                value="$15k"
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-evenly" sx={{py: 3}}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewTrends
                                chartSeries={chartSeriesTrend}
                                sx={{height: '100%'}}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewDeliveryTask
                                products={products}
                                sx={{height: '100%'}}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent="space-evenly">
                    <Grid item xs={12} md={6} lg={4.5}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewLatestInventory
                                products={products}
                                sx={{height: '100%'}}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={7.5}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewLatestRecords
                                orders={order}
                                sx={{height: '100%'}}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

CourierOverviewPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);
export default CourierOverviewPage;
