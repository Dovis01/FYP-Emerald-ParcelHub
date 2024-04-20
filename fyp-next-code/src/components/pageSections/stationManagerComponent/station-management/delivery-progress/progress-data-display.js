import {useEffect, useState} from "react";
import {
    addPlaceParcelsRecordsDataOfStation, deletePlaceParcelsRecordsDataOfStation,
    getDeliveringParcelsDataOfParcelStation,
} from "@/api/springboot-api";
import {
    Box, Button, Paper, SvgIcon,
} from "@mui/material";
import * as React from "react";
import {toast} from "react-toastify";
import {useAuthContext} from "@/contexts/auth-context";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {ParcelItemsTableRenderer} from "@/components/customized/dataGridTableRenderer/parcelItemsTableRenderer";
import {SenderTableRenderer} from "@/components/customized/dataGridTableRenderer/senderTableRenderer";
import {CustomerTableRenderer} from "@/components/customized/dataGridTableRenderer/customerTableRenderer";
import {
    ParcelHistoryStatusListRenderer
} from "@/components/customized/dataGridTableRenderer/parcelHistoryStatusListRenderer";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {LinearStepperFinishDialog} from "@/components/customized/linearStepper/linearStepperFinishDialog";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";


export const ProgressDataDisplay = () => {
    const auth = useAuthContext();
    const googleMap = useGoogleMapContext();
    const [rows, setRows] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [isSelectedRowIds, setIsSelectedRowIds] = useState([]);
    const [isExpandedColumnParcelItems, setIsExpandedColumnParcelItems] = useState(false);
    const [isExpandedColumnSender, setIsExpandedColumnSender] = useState(false);
    const [isExpandedColumnCustomer, setIsExpandedColumnCustomer] = useState(false);
    const [isExpandedColumnStatusHistory, setIsExpandedColumnStatusHistory] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDeliveringParcelsDataOfParcelStation(auth.user?.stationId);
            if (!result.success) {
                if(result.data == null){
                    toast.warning('Ooops! There is no parcel data to display!');
                    return;
                }
                toast.error('Ooops! ' + result.msg);
                return;
            }
            const addressMap = {};
            const newRows = result.data.map((parcelInfo) => {
                const companyAddress = parcelInfo.parcelHubCompany.address + ', PHC';
                const stationAddress = parcelInfo.parcelStation.address + ', PST';
                const combinedAddress = companyAddress + '|' + stationAddress;
                const trackingCode = parcelInfo.parcel.parcelTrackingCode;

                if (addressMap[combinedAddress]) {
                    addressMap[combinedAddress].push(trackingCode);
                } else {
                    addressMap[combinedAddress] = [trackingCode];
                }

                const parcelItemsRows = parcelInfo.parcel.items.map((parcelItem) => ({
                    id: parcelItem.itemId,
                    description: parcelItem.descriptionInfo,
                    quantity: parcelItem.quantity,
                    weight: parcelItem.weight,
                    price: parcelItem.price,
                    isDetailRow: true,
                    parentId: parcelInfo.parcel.orderId,
                    parcelWeight: parcelInfo.parcel.weight,
                    parcelVolume: parcelInfo.parcel.volume,
                    parcelLength: parcelInfo.parcel.length,
                    parcelWidth: parcelInfo.parcel.width,
                    parcelHeight: parcelInfo.parcel.height,
                }));

                const customer = {
                    customerName: parcelInfo.customer.fullName,
                    customerPhone: parcelInfo.customer.phoneNumber,
                    customerOrderEmail: parcelInfo.customer.orderEmail,
                    customerCity: parcelInfo.customer.city,
                    customerCountry: parcelInfo.customer.country,
                    customerAddress: parcelInfo.customer.address,
                };

                const sender = {
                    senderName: parcelInfo.sender.fullName,
                    senderEmail: parcelInfo.sender.email,
                    senderPhone: parcelInfo.sender.phoneNumber,
                    senderCity: parcelInfo.sender.city,
                    senderCountry: parcelInfo.sender.country,
                    senderAddress: parcelInfo.sender.address,
                };

                const parcelHistoryStatusList = parcelInfo.parcelHistoryStatusList.map((parcelHistoryStatus) => ({
                    statusInfo: parcelHistoryStatus.statusInfo,
                    updatedTime: parcelHistoryStatus.statusUpdateTimestamp,
                }));

                return {
                    id: parcelInfo.parcel.orderId,
                    parcelId: parcelInfo.parcel.parcelId,
                    parcelTrackingCode: parcelInfo.parcel.parcelTrackingCode,
                    parcelItems: parcelItemsRows,
                    parcelHistoryStatusList: parcelHistoryStatusList,
                    senderId: parcelInfo.sender.senderId,
                    senderInfo: sender,
                    customerId: parcelInfo.customer.customerId,
                    customerInfo: customer,
                    deliveryCompanyName: parcelInfo.parcelHubCompany.companyName,
                    deliveryCompanyType: parcelInfo.parcelHubCompany.companyType,
                    deliveryCompanyCity: parcelInfo.parcelHubCompany.city,
                    deliveryCompanyAddress: parcelInfo.parcelHubCompany.address,
                    courierFullName: parcelInfo.courier?.employeeInfo.fullName,
                    courierPhoneNumber: parcelInfo.courier?.employeeInfo.phoneNumber,
                    courierEmailAddress: parcelInfo.courier?.employeeInfo.emailAddress,
                    stationName: 'Emerald ParcelHub - ' + parcelInfo.parcelStation.communityName,
                    stationCommunityName: parcelInfo.parcelStation.communityName,
                    stationCity: parcelInfo.parcelStation.city,
                    stationAddress: parcelInfo.parcelStation.address,
                };
            });
            Object.entries(addressMap).forEach(([combinedAddress, trackingCodes]) => {
                const [companyAddress, stationAddress] = combinedAddress.split('|');
                googleMap.updateStationDeliveringParcelsRouteAddresses({
                    parcelTrackingCodes: trackingCodes,
                    routeAddresses: [companyAddress, stationAddress],
                });
            });
            setRows(newRows.flat());
        };

        fetchData();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Order Id', headerClassName: 'super-app-theme--header', width: 100},
        {
            field: 'parcelTrackingCode',
            headerName: 'Parcel Tracking Code',
            headerClassName: 'super-app-theme--header',
            width: 190
        },
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumnParcelItems ? 800 : 150,
            renderCell: (params) => <ParcelItemsTableRenderer parcelItems={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpandParcelItems}/>
        },
        {
            field: 'parcelHistoryStatusList',
            headerName: 'Parcel History Status List',
            width: isExpandedColumnStatusHistory ? 562 : 220,
            renderCell: (params) => <ParcelHistoryStatusListRenderer statusData={params} expandedRows={expandedRows}
                                                                     handleToggleExpand={handleToggleExpandStatusHistory}/>
        },
        {
            field: 'senderInfo',
            headerName: 'Sender Info',
            width: isExpandedColumnSender ? 650 : 130,
            renderCell: (params) => <SenderTableRenderer senderData={params} expandedRows={expandedRows}
                                                         handleToggleExpand={handleToggleExpandSender}/>
        },
        {
            field: 'customerInfo',
            headerName: 'Customer Info',
            width: isExpandedColumnCustomer ? 650 : 135,
            renderCell: (params) => <CustomerTableRenderer customerData={params} expandedRows={expandedRows}
                                                           handleToggleExpand={handleToggleExpandCustomer}/>
        },
        {
            field: 'courierFullName',
            headerName: 'Courier Full Name',
            headerClassName: 'super-app-theme--header',
            width: 170
        },
        {
            field: 'courierPhoneNumber',
            headerName: 'Courier Phone Number',
            headerClassName: 'super-app-theme--header',
            width: 210
        },
        {
            field: 'courierEmailAddress',
            headerName: 'Courier Email Address',
            headerClassName: 'super-app-theme--header',
            width: 230
        },
        {
            field: 'deliveryCompanyName',
            headerName: 'Delivery Company Name',
            headerClassName: 'super-app-theme--header',
            width: 350
        },
        {
            field: 'deliveryCompanyType',
            headerName: 'Company Type',
            headerClassName: 'super-app-theme--header',
            width: 145
        },
        {
            field: 'deliveryCompanyCity',
            headerName: 'Company City',
            headerClassName: 'super-app-theme--header',
            width: 130
        },
        {
            field: 'deliveryCompanyAddress',
            headerName: 'Delivery Company Address',
            headerClassName: 'super-app-theme--header',
            width: 450
        },
        {
            field: 'stationName',
            headerName: 'Parcel Station Name',
            headerClassName: 'super-app-theme--header',
            width: 310
        },
        {
            field: 'stationCity',
            headerName: 'Station City',
            headerClassName: 'super-app-theme--header',
            width: 120
        },
        {
            field: 'stationCommunityName',
            headerName: 'Community Name',
            headerClassName: 'super-app-theme--header',
            width: 180
        },
        {
            field: 'stationAddress',
            headerName: 'Parcel Station Address',
            headerClassName: 'super-app-theme--header',
            width: 435
        },
    ];


    const handleToggleExpandParcelItems = (rowId) => {
        setIsExpandedColumnParcelItems(true);
        const newExpandedRows = {
            ...expandedRows,
            [rowId]: !expandedRows[rowId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleToggleExpandStatusHistory = (rowId) => {
        setIsExpandedColumnStatusHistory(true);
        const newExpandedRows = {
            ...expandedRows,
            [rowId]: !expandedRows[rowId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleToggleExpandSender = (senderId) => {
        setIsExpandedColumnSender(true);
        const newExpandedRows = {
            ...expandedRows,
            [senderId]: !expandedRows[senderId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleToggleExpandCustomer = (customerId) => {
        setIsExpandedColumnCustomer(true);
        const newExpandedRows = {
            ...expandedRows,
            [customerId]: !expandedRows[customerId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleRowHeight = (params) => {
        let defaultHeight = 52;
        let parcelItemsHeight = expandedRows[params.id] ? (params.model.parcelItems.length + 1) * 96 : defaultHeight;
        let customerHeight = expandedRows[params.model.parcelTrackingCode] ? 350 : defaultHeight;
        let senderHeight = expandedRows[params.model.senderId] ? 350 : defaultHeight;
        let statusHistoryHeight = expandedRows[params.model.parcelId] ? (params.model.parcelHistoryStatusList.length + 1) * 60 : defaultHeight;

        return Math.max(parcelItemsHeight, customerHeight, senderHeight, statusHistoryHeight);
    }

    const handleRowSelectionChange = (rowSelectionModel) => {
        if (rowSelectionModel.length === 0) {
            setIsExpandedColumnParcelItems(false);
            setIsExpandedColumnSender(false);
            setIsExpandedColumnCustomer(false);
            setIsExpandedColumnStatusHistory(false);
            setExpandedRows({});
        }
        setIsSelectedRowIds(rowSelectionModel);
    };

    const handleConfirmDialogOpen = () => {
        setConfirmOpen(true);
    };

    const handleResetDialogOpen = () => {
        setResetOpen(true);
    };

    const handleConfirmDialogClose = () => {
        setConfirmOpen(false);
    };

    const handleResetDialogClose = () => {
        setResetOpen(false);
    };

    const handleConfirmReceivedForParcels = async () => {
        const selectedParcelIds = rows.filter(row => isSelectedRowIds.includes(row.id)).map(row => row.parcelId);
        if (selectedParcelIds.length === 0) {
            toast.error('Please select at least one parcel to confirm received!');
            setConfirmOpen(false);
            return;
        }
        const selectedParcelTrackingCodes = rows.filter(row => isSelectedRowIds.includes(row.id)).map(row => row.parcelTrackingCode);
        googleMap.updateStationDeliverySelectedParcelTrackingCodes(selectedParcelTrackingCodes);
        const result = await addPlaceParcelsRecordsDataOfStation(selectedParcelIds, auth.user?.stationManagerId, auth.user?.stationId);
        if (result.success) {
            toast.success('Successfully confirmed received for selected parcels!');
        } else {
            toast.error('Ooops! ' + result.msg);
        }
        setConfirmOpen(false);
    }

    const handleResetReceivedForParcels = async () => {
        googleMap.updateStationDeliverySelectedParcelTrackingCodes([]);
        const result = await deletePlaceParcelsRecordsDataOfStation(auth.user?.stationManagerId, auth.user?.stationId);
        result.success ? toast.success('Successfully reset received for all parcels!') : toast.error('Ooops! ' + result.msg);
        setResetOpen(false);
    }

    return (
        <Box>
            <DataGridTable rows={rows} columns={columns} handleRowHeight={handleRowHeight}
                           handleRowSelectionChange={handleRowSelectionChange}/>
            <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -0.2, mb: -0.8}}>
                <Button
                    variant="text"
                    onClick={handleConfirmDialogOpen}
                    sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                    startIcon={<DoneAllIcon/>}
                >
                    Confirm received for parcels
                </Button>
                <LinearStepperFinishDialog open={confirmOpen}
                                           handleDialogClose={handleConfirmDialogClose}
                                           handleFinishConfirm={handleConfirmReceivedForParcels}
                                           taskType={'Confirm Received'}/>
                <Button
                    variant="text"
                    onClick={handleResetDialogOpen}
                    sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowPathIcon/>
                        </SvgIcon>
                    )}
                >
                    Reset received parcels
                </Button>
                <LinearStepperFinishDialog open={resetOpen}
                                           handleDialogClose={handleResetDialogClose}
                                           handleFinishConfirm={handleResetReceivedForParcels}
                                           taskType={'Reset Received'}/>
            </Paper>
        </Box>
    )
}
