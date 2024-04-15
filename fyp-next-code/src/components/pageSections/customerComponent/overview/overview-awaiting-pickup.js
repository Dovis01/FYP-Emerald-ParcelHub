import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";
import {useEffect, useState} from "react";
import {getParcelPickupCodesByCustomerId} from "@/api/springboot-api";
import {useTheme} from "@mui/material/styles";
import {Chart} from "@/components/customized/chart";

export const OverviewAwaitingPickup = (props) => {
    const theme = useTheme();
    const {difference, positive = false, sx, loadCacheData} = props;
    const auth = useAuthContext();
    const [value, setValue] = useState(null);
    const seriesData = loadCacheData.OverviewAwaitingPickup || [];

    useEffect(() => {
        const fetchJsonData = async () => {
            const result = await getParcelPickupCodesByCustomerId(auth.user.customerId);
            setValue(() => result.data.length);
        };

        fetchJsonData();
    }, [auth.user.customerId]);

    const options = {
        series: [{
            name: 'No. of Parcels Awaiting Pickup',
            data: seriesData
        }],
        colors: [theme.palette.success.main],
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.3
        },
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            show: false,
            min: 0,
        },
        tooltip: {
            enabled: true,
            x: {
                show: false
            },
            y: {
                formatter: function (val) {
                    return `${val}`;
                }
            },
        },
    };

    return (
        <Card sx={sx}>
            <Box>
                <CardContent>
                    <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Stack spacing={1}>
                            <Typography
                                sx={{fontSize: '1.08rem', fontWeight: '720'}}
                            >
                                No. of Parcels Awaiting Pickup
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <Typography variant="h4" sx={{mr: 2}}>
                                    {value}
                                </Typography>
                                {difference && (
                                    <>
                                        <SvgIcon
                                            color={positive ? 'success' : 'error'}
                                            fontSize="small"
                                        >
                                            {positive ? <ArrowUpIcon/> : <ArrowDownIcon/>}
                                        </SvgIcon>
                                        <Typography
                                            color={positive ? 'success.main' : 'error.main'}
                                            variant="body2"
                                        >
                                            {difference}%
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="caption"
                                        >
                                            Since last month
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Stack>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <SvgIcon>
                                <WarehouseIcon/>
                            </SvgIcon>
                        </Avatar>
                    </Stack>
                </CardContent>
                <Chart
                    options={options}
                    series={options.series}
                    type="area"
                    height={160}
                />
            </Box>
        </Card>
    );
};

