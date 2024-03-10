import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {JsonDataDisplay} from "@/components/pageSections/adminComponent/ecommerce-data-display";


const ECommerceOrderOverviewPage = () => {
    return (
        <>
            <Head>
                <title>
                    Overview | E-Commerce Order
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
                            E-Commerce Order Overview
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
                                <JsonDataDisplay />
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

ECommerceOrderOverviewPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default ECommerceOrderOverviewPage;
