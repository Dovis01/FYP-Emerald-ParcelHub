import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {AccountProfile} from '@/components/pageSections/account/account-profile';
import {AccountProfileDetails} from '@/components/pageSections/account/account-profile-details';
import {useAuthContext} from "@/contexts/auth-context";

const AdminAccountPage = () => {
    const auth = useAuthContext();
    return (
        <>
            <Head>
                <title>
                    Account | {auth.currentUsername}
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
                            Account
                        </Typography>
                        <Grid
                            container
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

AdminAccountPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default AdminAccountPage;
