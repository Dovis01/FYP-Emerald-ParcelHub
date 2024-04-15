import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {
    AllEmployeesDataDisplay
} from "@/components/pageSections/adminComponent/people-management/all-employees-data-display";


const PeopleManagementCompanyEmployeesPage = () => {
    return (
        <>
            <Head>
                <title>
                    People Management | Company Employees
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
                            Company Employees
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
                                <AllEmployeesDataDisplay/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

PeopleManagementCompanyEmployeesPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default PeopleManagementCompanyEmployeesPage;
