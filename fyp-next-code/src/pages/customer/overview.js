import Head from 'next/head';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {Box, Grid, Paper} from "@mui/material";
import {OverviewParcelsOnWay} from "@/components/pageSections/customerComponent/overview/overview-parcels-on-way";
import {OverviewAwaitingPickup} from "@/components/pageSections/customerComponent/overview/overview-awaiting-pickup";
import {OverviewItemsNum} from "@/components/pageSections/customerComponent/overview/overview-items-num";
import {OverviewOrdersNum} from "@/components/pageSections/customerComponent/overview/overview-orders-num";
import {OverviewTrends} from "@/components/pageSections/customerComponent/overview/overview-trends";
import {OverviewToBePickedUpList} from "@/components/pageSections/customerComponent/overview/overview-to-be-pickedup-list";
import {useAuthContext} from "@/contexts/auth-context";
import {OverviewIntroDisplay} from "@/components/pageSections/customerComponent/overview/overview-intro-display";
import {OverviewEwebsitePie} from "@/components/pageSections/customerComponent/overview/overview-ewebsite-pie";
import {useEffect, useState} from "react";
import {getEcommerceSimulationPastTimeDataByRoleType} from "@/api/springboot-api";

const CustomerOverviewPage = () => {
    const auth = useAuthContext();
    const [loadCacheData, setLoadCacheData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getEcommerceSimulationPastTimeDataByRoleType("Customer");
            if (result.success) {
                setLoadCacheData(result.data);
            }
        }
        fetchData();
    }, []);

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
                <Grid container spacing={2} justifyContent="space-evenly" sx={{py: 3}}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={12} sx={{height: '468px'}}>
                            <OverviewIntroDisplay />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={12} sx={{height: '468px'}}>
                            <OverviewToBePickedUpList/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-evenly">
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '294px',borderRadius: 3}}>
                            <OverviewParcelsOnWay
                                {...(Object.keys(loadCacheData).length !== 0 ? { difference: 12, positive: true } : {})}
                                sx={{height: '100%'}}
                                loadCacheData={loadCacheData}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '294px',borderRadius: 3}}>
                            <OverviewAwaitingPickup
                                {...(Object.keys(loadCacheData).length !== 0 ? { difference: 16, positive: false } : {})}
                                sx={{height: '100%'}}
                                loadCacheData={loadCacheData}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '294px',borderRadius: 3}}>
                            <OverviewOrdersNum
                                {...(Object.keys(loadCacheData).length !== 0 ? { difference: 19, positive: true } : {})}
                                sx={{height: '100%'}}
                                loadCacheData={loadCacheData}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper elevation={12} sx={{height: '294px',borderRadius: 3}}>
                            <OverviewItemsNum
                                sx={{height: '100%'}}
                                {...(Object.keys(loadCacheData).length !== 0 ? { difference: 25, positive: false } : {})}
                                loadCacheData={loadCacheData}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="space-evenly" sx={{py: 3}}>
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewTrends
                                sx={{height: '100%'}}
                                loadCacheData={loadCacheData}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper elevation={12} sx={{height: '100%'}}>
                            <OverviewEwebsitePie
                                sx={{height: '100%'}}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

CustomerOverviewPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);
export default CustomerOverviewPage;
