import {ThemeProvider} from '@mui/material/styles';
import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import {createEmotionCache} from '@/components/customized/createEmotionCache';
import {createTheme} from '@/theme';
import {CssBaseline} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {AuthContextProvider} from "@/contexts/auth-context";
import {useNProgressBar} from '@/components/customized/nProgressBar';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Analytics} from '@vercel/analytics/react';
import 'simplebar-react/dist/simplebar.min.css';
import {ToastContainer, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {GoogleMapContextProvider} from "@/contexts/googleMap-context";

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
                <GoogleMapContextProvider>
                    <AuthContextProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            {getLayout(<Component {...pageProps} />)}
                            <SpeedInsights/>
                            <Analytics/>
                            <ToastContainer
                                style={{width: "550px"}}
                                position="top-center"
                                autoClose={6000}
                                limit={3}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                                transition={Bounce}
                            />
                        </ThemeProvider>
                    </AuthContextProvider>
                </GoogleMapContextProvider>
            </LocalizationProvider>
        </CacheProvider>
    )
}

export default App
