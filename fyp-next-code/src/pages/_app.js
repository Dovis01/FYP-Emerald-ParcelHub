import {ThemeProvider} from '@mui/material/styles';
import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import {createEmotionCache} from '@/components/customized/createEmotionCache';
import {createTheme} from '@/theme';
import { CssBaseline } from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {AuthContextProvider} from "@/contexts/auth-context";
import {useNProgressBar} from '@/components/customized/nProgressBar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import 'simplebar-react/dist/simplebar.min.css';

const clientSideEmotionCache = createEmotionCache();
const App = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const getLayout = Component.getLayout || ((page) => page);
    const theme = createTheme();
    useNProgressBar();

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>
                    Emerald-Parcel Hub
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AuthContextProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                        <SpeedInsights />
                        <Analytics />
                    </ThemeProvider>
                </AuthContextProvider>
            </LocalizationProvider>
        </CacheProvider>
    )
}

export default App