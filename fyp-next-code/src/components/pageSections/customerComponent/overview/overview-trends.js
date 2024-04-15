import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon
} from '@mui/material';
import { useTheme} from '@mui/material/styles';
import {Chart} from '@/components/customized/chart';

export const OverviewTrends = (props) => {
    const {sx,loadCacheData} = props;
    const theme = useTheme();

    const seriesData = loadCacheData.OverviewTrends || [];

    const options = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.error.light,theme.palette.warning.main],
        series: seriesData,
        fill: {
            opacity: [0.85, 0.25, 1,0.25],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        theme: {
            mode: theme.palette.mode
        },
        stroke: {
            width: [0, 6, 6,6],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '39px',
                borderRadius: 5
            }
        },
        markers: {
            size: [0, 2, 2,2]
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                offsetY: 1.2,
                style: {
                    fontSize: 13,
                    fontWeight: 600,
                    colors: theme.palette.text.secondary,
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (value) => (`${value}`),
                offsetX: -10,
                style: {
                    fontSize: 13,
                    fontWeight: 600,
                    colors: theme.palette.text.secondary
                }
            },
            min: 0,
            max: 110
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 8,
            offsetX: -5
        }
    };

    return (
        <Card sx={sx}>
            <CardHeader
                action={(
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <ArrowPathIcon/>
                            </SvgIcon>
                        )}
                    >
                        Sync
                    </Button>
                )}
                title="The Number of Personal Parcels Comparison Trends"
            />
            <CardContent>
                <Chart
                    height={350}
                    // options={chartOptions}
                    // series={chartSeriesTrend}
                    type="line"
                    options={options}
                    series={options.series}
                    sx={{width: '110vh'}}
                />
            </CardContent>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon/>
                        </SvgIcon>
                    )}
                    size="small"
                >
                    Overview
                </Button>
            </CardActions>
        </Card>
    );
};

