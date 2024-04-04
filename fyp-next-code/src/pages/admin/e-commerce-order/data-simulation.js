import Head from 'next/head';
import {Box, Container, Stack, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import MainPageLayout from "@/components/layouts/mainPageLayout";
import {
    RealTimeJSONDataFileUpload
} from "@/components/pageSections/adminComponent/ecommerce-realTime-json-upload";
import {uploadEcommerceSimulationPastTimeData, uploadEcommerceSimulationRealTimeData} from "@/api/springboot-api";
import {toast} from "react-toastify";
import {PastTimeJSONDataFileUpload} from "@/components/pageSections/adminComponent/ecommerce-pastTime-json-upload";

const ECommerceDataSimulationPage = () => {
    const handleRealTimeJsonUpload = async (jsonData) => {
        if (jsonData) {
            const result = await uploadEcommerceSimulationRealTimeData(JSON.stringify(jsonData));
            if (result.success) {
                toast.success('The real time Json simulation data has uploaded successfully!');
            } else {
                toast.error('Ooops! ' + result.msg + ' Please try again!');
            }
        } else {
            toast.error('Ooops! The content of file uploaded is empty. Please try again!');
        }
    };

    const handlePastTimeJsonUpload = async (jsonData) => {
        if (jsonData) {
            const result = await uploadEcommerceSimulationPastTimeData(JSON.stringify(jsonData));
            if (result.success) {
                toast.success('The past time Json simulation data has uploaded successfully!');
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
                    pt: 2
                }}
            >
                <Container>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            E-Commerce Order Data Simulation
                        </Typography>
                        <Grid
                            container
                            spacing={1.5}
                        >
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <RealTimeJSONDataFileUpload onUpload={handleRealTimeJsonUpload}/>
                            </Grid>
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <PastTimeJSONDataFileUpload onUpload={handlePastTimeJsonUpload}/>
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
