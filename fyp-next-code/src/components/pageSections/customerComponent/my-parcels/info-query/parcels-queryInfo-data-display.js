import {useEffect, useState} from "react";
import {
    getAllCustomerPersonalParcelsData,
} from "@/api/springboot-api";
import {
    Box,
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


export const ParcelQueryInfoDataDisplay = () => {
    const auth = useAuthContext();
    const googleMap = useGoogleMapContext();
    const [rows, setRows] = useState([]);
    const [isExpandedColumnParcelItems, setIsExpandedColumnParcelItems] = useState(false);
    const [isExpandedColumnSender, setIsExpandedColumnSender] = useState(false);
    const [isExpandedColumnCustomer, setIsExpandedColumnCustomer] = useState(false);
    const [isExpandedColumnStatusHistory, setIsExpandedColumnStatusHistory] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchJsonData = async () => {
            const result = await getAllCustomerPersonalParcelsData(auth.user.customerId);
            if (!result.success) {
                toast.error('Ooops! ' + result.msg);
                return;
            }
            const newRows = result.data.map((parcelInfo) => {
                googleMap.updateCustomerStationAddresses([
                    parcelInfo.customer.address + ', CUS',
                    parcelInfo.parcelStation.address + ', PST'
                ])
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
                    parcelPickupCode: parcelInfo.parcel.parcelPickupCode,
                    parcelItems: parcelItemsRows,
                    parcelHistoryStatusList: parcelHistoryStatusList,
                    senderId: parcelInfo.sender.senderId,
                    senderInfo: sender,
                    customerId: parcelInfo.customer.customerId,
                    customerInfo: customer,
                    stationName: 'Emerald ParcelHub - ' + parcelInfo.parcelStation.communityName,
                    stationCommunityName: parcelInfo.parcelStation.communityName,
                    stationAddress: parcelInfo.parcelStation.address,
                    stationManagerFullName: parcelInfo.parcelStationManager.fullName,
                    stationManagerPhoneNumber: parcelInfo.parcelStationManager.phoneNumber,
                };
            });
            setRows(newRows.flat());
        };

        fetchJsonData();
    }, [auth.user.customerId, googleMap]);

    const columns = [
        {field: 'id', headerName: 'Order ID', headerClassName: 'super-app-theme--header', width:86},
        {
            field: 'parcelTrackingCode',
            headerName: 'Parcel Tracking Code',
            headerClassName: 'super-app-theme--header',
            width: 172
        },
        {
            field: 'parcelPickupCode',
            headerName: 'Parcel Pickup Code',
            headerClassName: 'super-app-theme--header',
            width: 162
        },
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumnParcelItems ? 800 : 113,
            renderCell: (params) => <ParcelItemsTableRenderer parcelItems={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpandParcelItems}/>
        },
        {
            field: 'parcelHistoryStatusList',
            headerName: 'Parcel History Status List',
            width: isExpandedColumnStatusHistory ? 562 : 203,
            renderCell: (params) => <ParcelHistoryStatusListRenderer statusData={params} expandedRows={expandedRows}
                                                                     handleToggleExpand={handleToggleExpandStatusHistory}/>
        },
        {
            field: 'senderInfo',
            headerName: 'Sender Info',
            width: isExpandedColumnSender ? 650 : 113,
            renderCell: (params) => <SenderTableRenderer senderData={params} expandedRows={expandedRows}
                                                         handleToggleExpand={handleToggleExpandSender}/>
        },
        {
            field: 'customerInfo',
            headerName: 'Customer Info',
            width: isExpandedColumnCustomer ? 650 : 122,
            renderCell: (params) => <CustomerTableRenderer customerData={params} expandedRows={expandedRows}
                                                           handleToggleExpand={handleToggleExpandCustomer}/>
        },
        {
            field: 'stationName',
            headerName: 'Parcel Station Name',
            headerClassName: 'super-app-theme--header',
            width: 300
        },
        {
            field: 'stationCommunityName',
            headerName: 'Community Name',
            headerClassName: 'super-app-theme--header',
            width: 170
        },
        {
            field: 'stationAddress',
            headerName: 'Parcel Station Address',
            headerClassName: 'super-app-theme--header',
            width: 416
        },
        {
            field: 'stationManagerFullName',
            headerName: 'Station Manager Name',
            headerClassName: 'super-app-theme--header',
            width: 196
        },
        {
            field: 'stationManagerPhoneNumber',
            headerName: 'Manager Phone Number',
            headerClassName: 'super-app-theme--header',
            width: 220
        }
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
    };

    return (
        <Box>
            <DataGridTable rows={rows} columns={columns} handleRowHeight={handleRowHeight}
                           handleRowSelectionChange={handleRowSelectionChange}/>
        </Box>
    )
}
