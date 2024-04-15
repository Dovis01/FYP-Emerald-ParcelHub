import {useEffect, useState} from "react";
import {
     getAllCustomerPersonalOrdersData,
} from "@/api/springboot-api";
import {
    Box,
} from "@mui/material";
import * as React from "react";
import {SeverityPill} from "@/components/customized/severityPill";
import {useAuthContext} from "@/contexts/auth-context";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {ParcelItemsTableRenderer} from "@/components/customized/dataGridTableRenderer/parcelItemsTableRenderer";

const pillDisplayMap = {
    'Packaged': 'warning',
    'In transit': 'info',
    'Delivered': 'success',
}

export const MyOrdersDataDisplay = () => {
    const auth = useAuthContext();
    const currentCustomer = auth.user;
    const [rows, setRows] = useState([]);
    const [isExpandedColumn, setIsExpandedColumn] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCustomerPersonalOrdersData(currentCustomer.customerId);
            const newRows = result.data.map((item) => {
                const parcelItemsRows = item.parcel.items.map((parcelItem) => ({
                    id: parcelItem.itemId,
                    description: parcelItem.descriptionInfo,
                    quantity: parcelItem.quantity,
                    weight: parcelItem.weight,
                    price: parcelItem.price,
                    isDetailRow: true,
                    parentId: item.orderId,
                    parcelWeight: item.parcel.weight,
                    parcelVolume: item.parcel.volume,
                    parcelLength: item.parcel.length,
                    parcelWidth: item.parcel.width,
                    parcelHeight: item.parcel.height,
                }));

                return {
                    id: item.orderId,
                    orderDate: item.orderDate,
                    orderStatus: item.orderStatus,
                    customerName: item.customer.fullName,
                    customerPhone: item.customer.phoneNumber,
                    customerOrderEmail: item.customer.orderEmail,
                    customerCity: item.customer.city,
                    customerCountry: item.customer.country,
                    customerAddress: item.customer.address,
                    expectedDeliveryDate: item.expectedDeliveryDate,
                    eCommercePlatformName: item.ecommerceWebsite.websiteName,
                    eCommercePlatformUrl: item.ecommerceWebsite.url,
                    parcelItems: parcelItemsRows,
                    parcelWeight: item.parcel.weight,
                    parcelVolume: item.parcel.volume,
                };
            });
            setRows(newRows.flat());
        };

        fetchData();
    }, [currentCustomer.customerId]);

    const columns = [
        {field: 'id', headerName: 'Order Id', headerClassName: 'super-app-theme--header', width: 85},
        {field: 'orderDate', headerName: 'Order Date', headerClassName: 'super-app-theme--header', width: 176},
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            headerClassName: 'super-app-theme--header',
            width: 155,
            renderCell: (params) => (
                <SeverityPill color={pillDisplayMap[params.value]}>
                    {params.value}
                </SeverityPill>
            )
        },
        {field: 'customerName', headerName: 'Customer Name', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'customerPhone', headerName: 'Customer Phone', headerClassName: 'super-app-theme--header', width: 162},
        {
            field: 'customerOrderEmail',
            headerName: 'Customer Order Email',
            headerClassName: 'super-app-theme--header',
            width: 218
        },
        {field: 'customerCity', headerName: 'Customer City', headerClassName: 'super-app-theme--header', width: 140},
        {
            field: 'customerCountry',
            headerName: 'Customer Country',
            headerClassName: 'super-app-theme--header',
            width: 160
        },
        {
            field: 'customerAddress',
            headerName: 'Customer Address',
            headerClassName: 'super-app-theme--header',
            width: 363
        },
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumn ? 800 : 150,
            renderCell: (params) => <ParcelItemsTableRenderer parcelItems={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpand}/>
        },

        {
            field: 'expectedDeliveryDate',
            headerName: 'Expected Delivery Date',
            headerClassName: 'super-app-theme--header',
            width: 200
        },
        {
            field: 'eCommercePlatformName',
            headerName: 'E-Commerce Platform Name',
            headerClassName: 'super-app-theme--header',
            width: 235
        },
        {
            field: 'eCommercePlatformUrl',
            headerName: 'E-Commerce Platform Url',
            headerClassName: 'super-app-theme--header',
            width: 215
        }
    ];

    const handleToggleExpand = (rowId) => {
        setIsExpandedColumn(true);
        const newExpandedRows = {
            ...expandedRows,
            [rowId]: !expandedRows[rowId],
        };
        setExpandedRows(newExpandedRows);
    };


    const handleRowHeight = (params) => {
        return expandedRows[params.id] ? (params.model.parcelItems.length+1) * 96 : 52;
    }

    const handleRowSelectionChange = (rowSelectionModel) => {
        if (rowSelectionModel.length === 0) {
            setIsExpandedColumn(false);
            setExpandedRows({});
        }
    };

    return (
        <Box>
            <DataGridTable
                rows={rows}
                columns={columns}
                handleRowHeight={handleRowHeight}
                handleRowSelectionChange={handleRowSelectionChange}
            />
        </Box>
    )
}
