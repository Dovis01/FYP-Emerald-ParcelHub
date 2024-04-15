import {useState} from "react";
import {
    getCourierTodayCollectionTasks, resetParcelsCollectionTasks,
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
import CursorArrowRaysIcon from '@heroicons/react/24/solid/CursorArrowRaysIcon';
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import {TruckTableRenderer} from "@/components/customized/dataGridTableRenderer/truckTableRenderer";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import {
    CourierTasksConfirmButtonRenderer
} from "@/components/customized/dataGridTableRenderer/courierTasksConfirmButtonRenderer";
import CollectionHorizontalLinearStepper from "@/components/customized/linearStepper/collectionHorizontalLinearStepper";


export const CollectionTasksDataDisplay = () => {
    const auth = useAuthContext();
    const googleMap = useGoogleMapContext();
    const [rows, setRows] = useState([]);
    const [isExpandedColumnParcelItems, setIsExpandedColumnParcelItems] = useState(false);
    const [isExpandedColumnSender, setIsExpandedColumnSender] = useState(false);
    const [isExpandedColumnTruck, setIsExpandedColumnTruck] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    const GetTodayCollectionTasks = async () => {
        const result = await getCourierTodayCollectionTasks(auth.user.courierId);

        if (!result.success) {
            toast.error('Ooops! ' + result.msg);
            return;
        } else if(result.data.length === 0) {
            toast.info('No collection tasks for today!');
            return;
        }
        else {
            toast.success('Successfully fetched today collection tasks!');
        }
        const companyAddress = result.data[0].courier.employeeInfo.parcelHubCompany.address + ', PHC';
        const addressMap = {
            [companyAddress]: null,
        };

        const newRows = result.data.map((data) => {
            const senderAddress = data.sender.address + ', SEN';
            const trackingCode = data.parcel.parcelTrackingCode;

            if (addressMap[senderAddress]) {
                addressMap[senderAddress].push(trackingCode);
            } else {
                addressMap[senderAddress] = [trackingCode];
            }

            const parcelItemsRows = data.parcel.items.map((parcelItem) => ({
                id: parcelItem.itemId,
                description: parcelItem.descriptionInfo,
                quantity: parcelItem.quantity,
                weight: parcelItem.weight,
                price: parcelItem.price,
                isDetailRow: true,
                parentId: data.parcel.orderId,
                parcelWeight: data.parcel.weight,
                parcelVolume: data.parcel.volume,
                parcelLength: data.parcel.length,
                parcelWidth: data.parcel.width,
                parcelHeight: data.parcel.height,
            }));

            const sender = {
                senderName: data.sender.fullName,
                senderEmail: data.sender.email,
                senderPhone: data.sender.phoneNumber,
                senderCity: data.sender.city,
                senderCountry: data.sender.country,
                senderAddress: data.sender.address,
            };

            const truck = {
                truckType: data.truck.truckType,
                truckPlateNumber: data.truck.truckPlateNumber,
                maxWeight: data.truck.maxWeight + ' kg',
                storageAreaHeight: data.truck.storageAreaHeight + ' m',
                storageAreaLength: data.truck.storageAreaLength + ' m',
                storageAreaWidth: data.truck.storageAreaWidth + ' m',
                maxVolume: data.truck.volume + ' m³',
            }

            return {
                id: data.collectionRecordId,
                orderId: data.parcel.orderId,
                parcelId: data.parcel.parcelId,
                parcelTrackingCode: data.parcel.parcelTrackingCode,
                parcelItems: parcelItemsRows,
                senderId: data.sender.senderId,
                senderInfo: sender,
                deliveryCompanyName: data.courier.employeeInfo.parcelHubCompany.companyName,
                deliveryCompanyType: data.courier.employeeInfo.parcelHubCompany.companyType,
                deliveryCompanyAddress: data.courier.employeeInfo.parcelHubCompany.address,
                courierId: data.courier.courierId,
                courierFullName: data.courier.employeeInfo.fullName,
                courierWorkType: data.courier.workType,
                courierPhoneNumber: data.courier.employeeInfo.phoneNumber,
                courierEmail: data.courier.employeeInfo.emailAddress,
                remainingParcelsNumToDistribute: data.courier.remainingParcelsNumToDistribute + ' parcels',
                truckId: data.truck.truckId,
                truckInfo: truck,
            };
        });
        const newAddresses = Object.entries(addressMap).map(([address, parcelTrackingCodes]) => ({
            address,
            parcelTrackingCodes,
        }));
        newAddresses.forEach(googleMap.updateCourierCollectionRouteAddresses);
        setRows(() => newRows.flat());
    };

    const columns = [
        {field: 'id', headerName: 'Collection Record Id', headerClassName: 'super-app-theme--header', width: 160},
        {
            field: 'CollectionOperation',
            headerName: 'Confirm Collection',
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderCell: (params) => <CourierTasksConfirmButtonRenderer row={params.row} statusInfo='Collected' taskType='Collection'/>
        },
        {field: 'orderId', headerName: 'Order Id', headerClassName: 'super-app-theme--header', width: 90},
        {
            field: 'parcelTrackingCode',
            headerName: 'Parcel Tracking Code',
            headerClassName: 'super-app-theme--header',
            width: 185
        },
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumnParcelItems ? 800 : 130,
            renderCell: (params) => <ParcelItemsTableRenderer parcelItems={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpandParcelItems}/>
        },
        {
            field: 'senderInfo',
            headerName: 'Sender Info',
            width: isExpandedColumnSender ? 650 : 125,
            renderCell: (params) => <SenderTableRenderer senderData={params} expandedRows={expandedRows}
                                                         handleToggleExpand={handleToggleExpandSender}/>
        },
        {
            field: 'deliveryCompanyName',
            headerName: 'Delivery Company Name',
            headerClassName: 'super-app-theme--header',
            width: 290
        },
        {
            field: 'deliveryCompanyType',
            headerName: 'Company Type',
            headerClassName: 'super-app-theme--header',
            width: 142
        },
        {
            field: 'deliveryCompanyAddress',
            headerName: 'Delivery Company Address',
            headerClassName: 'super-app-theme--header',
            width: 335
        },
        {
            field: 'courierFullName',
            headerName: 'Courier FullName',
            headerClassName: 'super-app-theme--header',
            width: 155
        },
        {
            field: 'courierWorkType',
            headerName: 'Work Type',
            headerClassName: 'super-app-theme--header',
            width: 140
        },
        {
            field: 'courierPhoneNumber',
            headerName: 'Phone Number',
            headerClassName: 'super-app-theme--header',
            width: 175
        },
        {
            field: 'courierEmail',
            headerName: 'Email Address',
            headerClassName: 'super-app-theme--header',
            width: 220
        },
        {
            field: 'remainingParcelsNumToDistribute',
            headerName: 'Remaining To Distribute',
            headerClassName: 'super-app-theme--header',
            width: 210
        },
        {
            field: 'truckInfo',
            headerName: 'Truck Info',
            width: isExpandedColumnTruck ? 440 : 150,
            renderCell: (params) => <TruckTableRenderer truckData={params} expandedRows={expandedRows}
                                                        handleToggleExpand={handleToggleExpandTruck}/>
        },
    ];

    const ResetParcelsCollectionTasks = async () => {
        setRows([]);
        const result = await resetParcelsCollectionTasks();
        if (result.success) {
            toast.success('Successfully reset all collection tasks!');
        } else {
            toast.error('Ooops! ' + result.msg);
        }
    }

    const handleToggleExpandParcelItems = (rowId) => {
        setIsExpandedColumnParcelItems(true);
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

    const handleToggleExpandTruck = (truckId) => {
        setIsExpandedColumnTruck(true);
        const newExpandedRows = {
            ...expandedRows,
            [truckId]: !expandedRows[truckId],
        };
        setExpandedRows(newExpandedRows);
    };

    const handleRowHeight = (params) => {
        let defaultHeight = 52;
        let parcelItemsHeight = expandedRows[params.model.orderId] ? (params.model.parcelItems.length + 1) * 96 : defaultHeight;
        let truckHeight = expandedRows[params.model.parcelId] ? 413 : defaultHeight;
        let senderHeight = expandedRows[params.model.senderId] ? 350 : defaultHeight;

        return Math.max(parcelItemsHeight, truckHeight, senderHeight);
    }

    const handleRowSelectionChange = (rowSelectionModel) => {
        if (rowSelectionModel.length === 0) {
            setIsExpandedColumnParcelItems(false);
            setIsExpandedColumnSender(false);
            setIsExpandedColumnTruck(false);
            setExpandedRows({});
        }
    };

    return (
        <Box>
            <CollectionHorizontalLinearStepper
                parcelsCodeList={rows.map(row => row.parcelTrackingCode)}
                parcelHubAddr={rows[0]?.deliveryCompanyAddress}
                ResetParcelsCollectionTasks={ResetParcelsCollectionTasks}
            />
            <DataGridTable rows={rows}
                           columns={columns}
                           handleRowHeight={handleRowHeight}
                           handleRowSelectionChange={handleRowSelectionChange}/>
            <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -0.2, mb: -0.8}}>
                <Button
                    variant="text"
                    onClick={GetTodayCollectionTasks}
                    sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <CursorArrowRaysIcon/>
                        </SvgIcon>
                    )}
                >
                    Get today collection tasks
                </Button>
                <Button
                    variant="text"
                    onClick={ResetParcelsCollectionTasks}
                    sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowPathIcon/>
                        </SvgIcon>
                    )}
                >
                    Reset collection tasks
                </Button>
            </Paper>
        </Box>
    )
}
