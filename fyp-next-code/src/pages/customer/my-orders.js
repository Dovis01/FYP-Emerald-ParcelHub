import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";
import {useAuthContext} from "@/contexts/auth-context";
import {MyOrdersDataDisplay} from "@/components/pageSections/customerComponent/myOrders-data-display";


const MyOrdersPage = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    My Orders | {auth.currentUsername}
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
                            My Orders
                        </Typography>
                        <Box
                            sx={{
                                width: '173.3vh', height: '100%',
                                boxShadow: 20,
                                bgcolor: 'customized.grey',
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
                                    <MyOrdersDataDisplay />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

MyOrdersPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyOrdersPage;
