import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {SettingsNotifications} from '@/components/pageSections/settings/settings-notifications';
import {SettingsPassword} from '@/components/pageSections/settings/settings-password';
import MainPageLayout from "@/components/layouts/mainPageLayout";

const SettingPage = () => (
    <>
        <Head>
            <title>
                Settings | Emerald-Parcel Hub
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
                    <Typography variant="h4">
                        Settings
                    </Typography>
                    <SettingsNotifications/>
                    <SettingsPassword/>
                </Stack>
            </Container>
        </Box>
    </>
);

SettingPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default SettingPage;
