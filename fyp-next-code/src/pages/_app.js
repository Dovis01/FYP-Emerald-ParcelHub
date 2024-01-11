import {ThemeProvider} from '@mui/material/styles';
import {createTheme} from '@/theme';
import UsersContextProvider from "@/contexts/usersContext";
import {AuthContextProvider} from "@/contexts/auth-context";

function App({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => page);
    const theme = createTheme();
    return (
        <UsersContextProvider>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </AuthContextProvider>
        </UsersContextProvider>
    )
}

export default App