import * as React from "react";
import {useEffect, useState} from "react";
import {getPlaceParcelsRecordsDataOfStation, resetOneParcelStationAllShelvesData} from "@/api/springboot-api";
import {Box, Button, Paper, SvgIcon} from "@mui/material";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {useAuthContext} from "@/contexts/auth-context";
import {ParcelBasicInfoTableRenderer} from "@/components/customized/dataGridTableRenderer/parcelBasicInfoTableRenderer";
import {
    StationParcelsStorageButtonRenderer
} from "@/components/customized/dataGridTableRenderer/stationParcelsStorageButtonRenderer";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import {toast} from "react-toastify";

export const ParcelsToStoreDataDisplay = () => {
    const {user} = useAuthContext();
    const [rows, setRows] = useState([]);
    const [fetchFlag, setFetchFlag] = useState(false);
    const [isExpandedColumnParcelInfo, setIsExpandedColumnParcelInfo] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPlaceParcelsRecordsDataOfStation(user?.stationManagerId, user?.stationId);
            const newRows = result.data.map((item) => {

                const parcelInfo = {
                    parcelId: item.parcel.parcelId,
                    parcelWeight: item.parcel.weight,
                    parcelVolume: item.parcel.volume,
                    parcelLength: item.parcel.length,
                    parcelWidth: item.parcel.width,
                    parcelHeight: item.parcel.height,
                };

                return {
                    id: item.parcel.orderId,
                    parcelId: item.parcel.parcelId,
                    stationId: item.parcel.stationId,
                    parcelTrackingCode: item.parcel.parcelTrackingCode,
                    parcelInfo: parcelInfo,
                    courierFullName: item.courier.employeeInfo.fullName,
                    courierPhoneNumber: item.courier.employeeInfo.phoneNumber,
                    courierEmailAddress: item.courier.employeeInfo.emailAddress,
                    companyName:item.courier.employeeInfo.parcelHubCompany.companyName,
                    companyType:item.courier.employeeInfo.parcelHubCompany.companyType,
                    companyAddress:item.courier.employeeInfo.parcelHubCompany.address,
                    truckType: item.truckInfo.truckType,
                    truckPlateNumber: item.truckInfo.truckPlateNumber,
                };
            });
            setRows(newRows.flat());
        };

        fetchData();
    }, [fetchFlag, user?.stationId, user?.stationManagerId]);

    const columns = [
        {field: 'id', headerName: 'Order ID', headerClassName: 'super-app-theme--header', width: 85},
        {
            field: 'StorageOperation',
            headerName: 'Confirm Storage',
            headerClassName: 'super-app-theme--header',
            width: 148,
            renderCell: (params) => <StationParcelsStorageButtonRenderer row={params.row} updateFetchFlag={updateFetchFlag}/>
        },
        {field: 'parcelTrackingCode', headerName: 'Parcel Tracking Code', headerClassName: 'super-app-theme--header', width: 175},
        {
            field: 'parcelInfo',
            headerName: 'Parcel Info',
            width: isExpandedColumnParcelInfo ? 750 : 108,
            renderCell: (params) => <ParcelBasicInfoTableRenderer parcelInfo={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpandParcelInfo}/>
        },
        {field: 'courierFullName', headerName: 'Courier FullName', headerClassName: 'super-app-theme--header', width: 150},
        {field: 'courierPhoneNumber', headerName: 'Phone Number', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'courierEmailAddress', headerName: 'Email Address', headerClassName: 'super-app-theme--header', width: 230},
        {field: 'companyName', headerName: 'Parcel Hub Company Name', headerClassName: 'super-app-theme--header', width: 305},
        {field: 'companyType', headerName: 'Company Type', headerClassName: 'super-app-theme--header', width: 130},
        {field: 'companyAddress', headerName: 'Company Address', headerClassName: 'super-app-theme--header', width: 415},
        {field: 'truckType', headerName: 'Truck Type', headerClassName: 'super-app-theme--header', width: 105},
        {field: 'truckPlateNumber', headerName: 'Truck Plate Number', headerClassName: 'super-app-theme--header', width: 186},
    ];

    const handleToggleExpandParcelInfo = (rowId) => {
        setIsExpandedColumnParcelInfo(true);
        const newExpandedRows = {
            ...expandedRows,
            [rowId]: !expandedRows[rowId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleRowHeight = (params) => {
        let defaultHeight = 52;
        return expandedRows[params.model.parcelId] ? 95 : defaultHeight;
    }

    const handleRowSelectionChange = (rowSelectionModel) => {
        if (rowSelectionModel.length === 0) {
            setIsExpandedColumnParcelInfo(false);
            setExpandedRows({});
        }
    };

    const updateFetchFlag = () => {
        setFetchFlag(!fetchFlag);
    }

    const handleResetAllPlacedParcels = async () => {
        const result = await resetOneParcelStationAllShelvesData(user?.stationId);
        if(result.success){
            toast.success("Reset all placed parcels of this station successfully!");

        } else if(result.msg === 'The parcel ids to clear pickup codes are empty.') {
            toast.error('Ooops! There are no parcels to reset.');
        } else{
            toast.error('Ooops! '+result.msg);
        }
        setFetchFlag(!fetchFlag);
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
                    handleRowHeight={handleRowHeight}
                    handleRowSelectionChange={handleRowSelectionChange}
                />
                <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -0.2, mb: -0.8}}>
                    <Button
                        variant="text"
                        onClick={handleResetAllPlacedParcels}
                        sx={{mr: 0.4, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <ArrowPathIcon/>
                            </SvgIcon>
                        )}
                    >
                        Reset all placed parcels
                    </Button>
                </Paper>
            </Box>
        </>
    )
}
