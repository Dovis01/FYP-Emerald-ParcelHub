import MainPageLayout from "@/components/layouts/mainPageLayout";
import Head from "next/head";
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from "@mui/material";


const MyParcelsInformationQuery = () => {
    return (
        <>
            <Head>
                <title>
                    Information Query | My Parcels
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
                <Container>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Parcels Information Query
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                            >

                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

MyParcelsInformationQuery.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default MyParcelsInformationQuery;
