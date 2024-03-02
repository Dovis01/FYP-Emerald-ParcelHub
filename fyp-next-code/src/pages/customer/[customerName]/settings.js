import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {SettingsNotifications} from '@/components/pageSections/settings/settings-notifications';
import {SettingsPassword} from '@/components/pageSections/settings/settings-password';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {useAuthContext} from "@/contexts/auth-context";

const CustomerSettingPage = () => {
    const auth = useAuthContext();
    return(
        <>
            <Head>
                <title>
                    Settings | {auth.currentUsername}
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    width: '100vh',
                    py:2
                }}
            >
                <Container>
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
}

CustomerSettingPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default CustomerSettingPage;