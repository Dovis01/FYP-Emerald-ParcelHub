import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import {Avatar, Card, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {getAllCustomerPersonalParcelsData} from "@/api/springboot-api";
import {useAuthContext} from "@/contexts/auth-context";

export const OverviewParcelsOnWay = (props) => {
    const {difference, positive = false, sx} = props;
    const auth = useAuthContext();
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchJsonData = async () => {
            const result = await getAllCustomerPersonalParcelsData(auth.user.customerId);
            setValue(() => result.data.length);
        };

        fetchJsonData();
    }, [auth.user.customerId]);

    return (
        <Card sx={sx}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            No. of parcels on the way
                        </Typography>
                        <Typography variant="h4">
                            {value}
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: 'error.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SvgIcon>
                            <DomainAddIcon/>
                        </SvgIcon>
                    </Avatar>
                </Stack>
                {difference && (
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{mt: 2}}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={0.5}
                        >
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
                        </Stack>
                        <Typography
                            color="text.secondary"
                            variant="caption"
                        >
                            Since last month
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

OverviewParcelsOnWay.prototypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    sx: PropTypes.object,
    value: PropTypes.string.isRequired
};
