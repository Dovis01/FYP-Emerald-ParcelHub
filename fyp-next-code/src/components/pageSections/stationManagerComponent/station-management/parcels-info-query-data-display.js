import {useEffect, useState} from "react";
import {
    getStoredParcelsDataOfParcelStation,
} from "@/api/springboot-api";
import {
    Box, Button, Paper, SvgIcon,
} from "@mui/material";
import * as React from "react";
import {useAuthContext} from "@/contexts/auth-context";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import RefreshIcon from '@mui/icons-material/Refresh';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import {InformCustomerButtonRenderer} from "@/components/customized/dataGridTableRenderer/informCustomerButtonRenderer";
import {SeverityPill} from "@/components/customized/severityPill";
import {
    StationConfirmPickupButtonRenderer
} from "@/components/customized/dataGridTableRenderer/stationConfirmPickupButtonRenderer";

const pillDisplayMap = {
    'Informed': 'success',
    'Not yet': 'warning',
    'Send failed': 'error',
}

export const ParcelsInfoQueryDataDisplay = () => {
    const {user} = useAuthContext();
    const [rows, setRows] = useState([]);
    const [freshFlag, setFreshFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getStoredParcelsDataOfParcelStation(user?.stationId);
            if (result.data) {
                const newRows = result.data.map((item) => {
                    return {
                        id: item.parcel.orderId,
                        parcelTrackingCode: item.parcel.parcelTrackingCode,
                        parcelPickupCode: item.parcel.parcelPickupCode,
                        customerFullName: item.customer.fullName,
                        customerPhoneNumber: item.customer.phoneNumber,
                        customerOrderEmail: item.customer.orderEmail,
                        customerAddress: item.customer.address,
                        parcelStationCommunityName: item.parcelStation.communityName,
                        parcelStationAddress: item.parcelStation.address,
                        informStatus: 'Not yet',
                    };
                });
                setRows(newRows.flat());
            }
        };

        fetchData();
    }, [freshFlag]);

    const columns = [
        {field: 'id', headerName: 'Order ID', headerClassName: 'super-app-theme--header', width: 85},
        {
            field: 'ConfirmPickupOperation',
            headerName: 'Confirm Pickup',
            headerClassName: 'super-app-theme--header',
            width: 145,
            renderCell: (params) => <StationConfirmPickupButtonRenderer row={params.row} handleConfirmPickupForParcel={handleConfirmPickupForParcel}/>
        },
        {
            field: 'InformOperation',
            headerName: 'Inform Customer',
            headerClassName: 'super-app-theme--header',
            width: 145,
            renderCell: (params) => <InformCustomerButtonRenderer row={params.row} handleInformStatusTextChange={handleInformStatusTextChange}/>
        },
        {
            field: 'InformStatus',
            headerName: 'Inform Status',
            headerClassName: 'super-app-theme--header',
            width: 123,
            renderCell: (params) => (
                <SeverityPill color={pillDisplayMap[params.row.informStatus]}>
                    {params.row.informStatus}
                </SeverityPill>
            )
        },
        {field: 'parcelTrackingCode', headerName: 'Parcel Tracking Code', headerClassName: 'super-app-theme--header', width: 170},
        {field: 'parcelPickupCode', headerName: 'Parcel Pickup Code', headerClassName: 'super-app-theme--header', width: 157},
        {field: 'customerFullName', headerName: 'Customer FullName', headerClassName: 'super-app-theme--header', width: 162},
        {field: 'customerPhoneNumber', headerName: 'Phone Number', headerClassName: 'super-app-theme--header', width: 157},
        {field: 'customerOrderEmail', headerName: 'Email Address', headerClassName: 'super-app-theme--header', width: 239},
        {field: 'customerAddress', headerName: 'Address', headerClassName: 'super-app-theme--header', width: 426},
        {field: 'parcelStationCommunityName', headerName: 'Station Community Name', headerClassName: 'super-app-theme--header', width: 305},
    ];

    const handleFreshFlagChange = () => {
        setFreshFlag(!freshFlag);
    }

    const handleInformStatusTextChange = (id, statusText) => {
        setRows(currentRows =>
            currentRows.map(row =>
                row.id === id ? { ...row, informStatus: statusText } : row
            )
        );
    }

    const handleResetInformStatus = () => {
        setRows(currentRows =>
            currentRows.map(row => {
                return { ...row, informStatus: 'Not yet' };
            })
        );
    };

    const handleConfirmPickupForParcel = (id) => {
        setRows(currentRows =>
            currentRows.filter(row => row.id !== id)
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: '172.9vh', height: '100%',
                }}
            >
                <DataGridTable
                    rows={rows}
                    columns={columns}
                />
                <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -0.2, mb: -0.8}}>
                    <Button
                        variant="text"
                        onClick={handleFreshFlagChange}
                        sx={{mr: 0.4, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <RefreshIcon/>
                            </SvgIcon>
                        )}
                    >
                        Fresh Records
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleResetInformStatus}
                        sx={{mr: 0.4, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <SwitchAccessShortcutIcon/>
                            </SvgIcon>
                        )}
                    >
                        Reset Inform Status
                    </Button>
                </Paper>
            </Box>
        </>
    )
}
