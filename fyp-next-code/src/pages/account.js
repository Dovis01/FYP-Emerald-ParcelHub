import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {AccountProfile} from '@/components/pageSections/account/account-profile';
import {AccountProfileDetails} from '@/components/pageSections/account/account-profile-details';

const AccountPage = () => (
    <>
        <Head>
            <title>
                Account | Emerald-Parcel Hub
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                ml:-25,
                mt: -5,
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <div>
                        <Typography variant="h4">
                            Account
                        </Typography>
                    </div>
                    <div>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile/>
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails/>
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            </Container>
        </Box>
    </>
);

AccountPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default AccountPage;
