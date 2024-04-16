import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography, useTheme
} from '@mui/material';
import {Chart} from "@/components/customized/chart";
import {useEffect, useState} from "react";
import {getEcommerceWebsiteInfoStatisticsByCustomerId} from "@/api/springboot-api";
import {useAuthContext} from "@/contexts/auth-context";

export const OverviewEwebsitePie = (props) => {
    const {sx} = props;
    const {user} = useAuthContext();
    const theme = useTheme();
    const [chartSeries,setChartSeries] = useState([]);
    const [labels,setLabels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getEcommerceWebsiteInfoStatisticsByCustomerId(user.customerId);
            if(result.success){
                setChartSeries(Object.values(result.data));
                setLabels(Object.keys(result.data));
            }
        }
        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            background: 'transparent'
        },
        colors: [
            theme.palette.primary.main,
            theme.palette.success.main,
            theme.palette.warning.main
        ],
        dataLabels: {
            enabled: true,
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            },
            style: {
                fontSize: '14px',
                colors: ['#f1eaea']
            }
        },
        labels,
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 8,
            offsetX: -5
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                dataLabels: {
                    offset: -5
                }
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };

    return (
        <Card sx={sx}>
            <CardHeader title="E-commerce Websites Distribution for Orders"/>
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    width="100%"
                />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    sx={{mt: 2}}
                >
                    {chartSeries.map((item, index) => {
                        const label = labels[index];

                        return (
                            <Box
                                key={label}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography
                                    sx={{my: 1}}
                                    variant="h6"
                                >
                                    {label}
                                </Typography>
                                <Typography
                                    color="grey"
                                    sx={{fontSize:'1rem',fontWeight:700}}
                                >
                                    {item}%
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

