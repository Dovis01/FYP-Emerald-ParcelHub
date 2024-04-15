import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {
    AllCustomersDataDisplay
} from "@/components/pageSections/adminComponent/people-management/all-customers-data-display";

const PeopleManagementCustomersPage = () => {
    return (
        <>
            <Head>
                <title>
                    People Management | Customers
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
                            Customers
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
                                <AllCustomersDataDisplay />
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

PeopleManagementCustomersPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default PeopleManagementCustomersPage;
