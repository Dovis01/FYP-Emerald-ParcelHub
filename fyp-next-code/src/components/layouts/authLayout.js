import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {Box, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import Image from "next/image";
import * as React from "react";
import {useEffect} from "react";

const noScroll = `
  .no-scroll {
    overflow: hidden !important;
  }
`;

export const AuthLayout = (props) => {
    const {children} = props;

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: noScroll}}/>
            <Box
                component="main"
                sx={{
                    mr: -1,
                    display: 'flex',
                    flex: '1 1 auto',
                }}
            >
                <Grid
                    container
                    sx={{flex: '1 1 auto'}}
                >
                    <Grid
                        xs={12}
                        lg={5.9}
                        sx={{
                            background: 'linear-gradient(144deg, rgba(207,239,247,0.9725140056022409) 2%, rgba(169,90,237,1) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    >
                        <Box
                            component="header"
                            sx={{
                                ml:2.1,
                                mt:1.1,
                                mb:0.7,
                                width: '100%'
                            }}
                        >
                            <Box
                                component={NextLink}
                                href="/"
                                sx={{
                                    display: 'inline-flex',
                                    height: 52,
                                    width: 52
                                }}
                            >
                                <Image
                                    src="/assets/logos/Emeral-ParcelHub-Logo2.png"
                                    alt="Logo"
                                    width={42}
                                    height={42}
                                    style={{
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                    priority
                                />
                            </Box>
                        </Box>
                        {children}
                    </Grid>
                    <Grid
                        xs={12}
                        lg={6.1}
                        sx={{
                            height: '100vh',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            color: 'white',
                            '& img': {
                                maxWidth: '100%'
                            }
                        }}
                    >
                        <Box sx={{
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                            height: '100%',
                            width: '100%',
                        }}>
                            <Box sx={{p: 3, mt: 3, ml: 1.9}}>
                                <Typography
                                    align="center"
                                    color="inherit"
                                    sx={{
                                        fontSize: '34px',
                                        lineHeight: '32px',
                                        mb: 1,
                                        mt: -8
                                    }}
                                    variant="h1"
                                >
                                    Welcome to{' '}
                                    <Box
                                        component="a"
                                        sx={{color: '#15B79E'}}
                                        target="_blank"
                                    >
                                        Emerald-Parcel Hub
                                    </Box>
                                </Typography>
                                <Typography
                                    align="center"
                                    sx={{mb: 1, fontSize: '18px', mt: 3}}
                                    variant="subtitle1"
                                >
                                    Emerald-ParcelHub is dedicated to making parcels delivery better
                                </Typography>
                                <Typography
                                    align="center"
                                    sx={{mb: 1, fontSize: '18px'}}
                                    variant="subtitle1"
                                >
                                    by finding smart ways.
                                </Typography>
                                <Box sx={{
                                    mt: 5,
                                    ml: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image
                                        src="/assets/logos/Emerald-ParcelHub-FullLogo.png"
                                        alt="Full Logo"
                                        width={556}
                                        height={556}
                                        priority
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

AuthLayout.prototypes = {
    children: PropTypes.node
};
