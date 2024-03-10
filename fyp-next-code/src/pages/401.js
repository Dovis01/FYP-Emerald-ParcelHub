import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import {Box, Button, Container, SvgIcon, Typography} from '@mui/material';

const Error401Page = () => (
    <>
        <Head>
            <title>
                401 | Emerald-Parcel Hub
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                mt:-10,
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Image
                            alt="Under development"
                            src="/assets/errors/error-401.png"
                            width={400}
                            height={400}
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%'
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        sx={{mb: 3}}
                        variant="h3"
                    >
                        401: Ooops, something went wrong!
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        variant="body1"
                        sx={{maxWidth: 600}}
                    >
                        You either were not authorized to access or you came here by some mistakes.
                        Whichever it is, try using the navigation to go back.
                    </Typography>
                    <Button
                        component={NextLink}
                        href="/"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <ArrowLeftIcon/>
                            </SvgIcon>
                        )}
                        sx={{mt: 3}}
                        variant="contained"
                    >
                        Go back to dashboard
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default Error401Page;
