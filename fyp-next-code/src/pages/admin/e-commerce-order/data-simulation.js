import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {JSONDataFileUpload} from "@/components/pageSections/adminComponent/ecommerce-json-upload";
import {uploadEcommerceSimulationData} from "@/api/springboot-api";
import {toast} from "react-toastify";

const ECommerceDataSimulationPage = () => {
    const handleJsonUpload = async (jsonData) => {
        if (jsonData) {
            const result = await uploadEcommerceSimulationData(JSON.stringify(jsonData));
            if (result.success) {
                toast.success('The Json simulation data has uploaded successfully!');
            } else {
                toast.error('Ooops! ' + result.msg + ' Please try again!');
            }
        } else {
            toast.error('Ooops! The content of file uploaded is empty. Please try again!');
        }
    };

    return (
        <>
            <Head>
                <title>
                    Data Simulation | E-Commerce Order
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    pt: 2,
                    height: '100vh'
                }}
            >
                <Container>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            E-Commerce Order Data Simulation
                        </Typography>
                        <Grid
                            container
                            spacing={0}
                        >
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <JSONDataFileUpload onUpload={handleJsonUpload}/>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
};

ECommerceDataSimulationPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);

export default ECommerceDataSimulationPage;
