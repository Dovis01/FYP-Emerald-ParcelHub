import {useEffect, useState} from "react";
import {
    clearAllEcommerceSimulationData,
    clearSelectedEcommerceSimulationData,
    getAllEcommerceSimulationData
} from "@/api/springboot-api";
import {
    Box,
    Button,
    Paper,
    SvgIcon,
} from "@mui/material";
import * as React from "react";
import {toast} from "react-toastify";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {SeverityPill} from "@/components/customized/severityPill";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {ParcelItemsTableRenderer} from "@/components/customized/dataGridTableRenderer/parcelItemsTableRenderer";


export const JsonDataDisplay = () => {
    const [rows, setRows] = useState([]);
    const [selectedDataIds, setSelectedDataIds] = useState([]);
    const [isExpandedColumn, setIsExpandedColumn] = useState(false);
    const [isClickSelectedToDelete, setIsClickSelectedToDelete] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchJsonData = async () => {
            const result = await getAllEcommerceSimulationData()
            const newRows = result.data.map((item) => {
                const parcelItemsRows = item.parcel.items.map((parcelItem) => ({
                    id: parcelItem.item_id,
                    description: parcelItem.description,
                    quantity: parcelItem.quantity,
                    weight: parcelItem.weight,
                    price: parcelItem.price,
                    isDetailRow: true,
                    parentId: item.ecommerce_json_data_id,
                    parcelWeight: item.parcel.weight,
                    parcelVolume: item.parcel.weight * item.parcel.length * item.parcel.width,
                    parcelLength: item.parcel.length,
                    parcelWidth: item.parcel.width,
                    parcelHeight: item.parcel.height
                }));

                return {
                    id: item.ecommerce_json_data_id,
                    orderId: item.order_id,
                    orderDate: item.order_date,
                    orderStatus: item.order_status,
                    customerName: item.customer.name,
                    customerPhone: item.customer.phone,
                    customerEmail: item.customer.email,
                    customerAddress: item.customer.address,
                    senderName: item.sender.name,
                    senderPhone: item.sender.phone,
                    senderEmail: item.sender.email,
                    senderAddress: item.sender.address,
                    expectedDeliveryDate: item.delivery.expected_delivery_date,
                    eCommercePlatformName: item.e_commerce_platform.name,
                    eCommercePlatformUrl: item.e_commerce_platform.website_url,
                    expressDeliveryCompanyName: item.express_delivery_company.company_name,
                    expressDeliveryCompanyType: item.express_delivery_company.companyType,
                    expressDeliveryCompanyLocation: item.express_delivery_company.location,
                    parcelItems: parcelItemsRows,
                    parcelStatus: item.parcel.status
                };
            });
            setRows(newRows.flat());
        };

        fetchJsonData();
    }, [isClickSelectedToDelete]);

    const columns = [
        {field: 'id', headerName: 'Data ID', headerClassName: 'super-app-theme--header', width: 90},
        {field: 'orderId', headerName: 'Order ID', headerClassName: 'super-app-theme--header', width: 110},
        {field: 'orderDate', headerName: 'Order Date', headerClassName: 'super-app-theme--header', width: 190},
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            headerClassName: 'super-app-theme--header',
            width: 163,
            renderCell: (params) => (
                <SeverityPill color={params.value === 'To be delivered' ? 'success' : 'warning'}>
                    {params.value}
                </SeverityPill>
            )
        },
        {field: 'customerName', headerName: 'Customer Name', headerClassName: 'super-app-theme--header', width: 143},
        {field: 'customerPhone', headerName: 'Customer Phone', headerClassName: 'super-app-theme--header', width: 170},
        {field: 'customerEmail', headerName: 'Customer Email', headerClassName: 'super-app-theme--header', width: 240},
        {
            field: 'customerAddress',
            headerName: 'Customer Address',
            headerClassName: 'super-app-theme--header',
            width: 390
        },
        {field: 'senderName', headerName: 'Sender Name', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'senderPhone', headerName: 'Sender Phone', headerClassName: 'super-app-theme--header', width: 160},
        {field: 'senderEmail', headerName: 'Sender Email', headerClassName: 'super-app-theme--header', width: 160},
        {field: 'senderAddress', headerName: 'Sender Address', headerClassName: 'super-app-theme--header', width: 390},
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumn ? 800 : 125,
            renderCell: (params) => <ParcelItemsTableRenderer parcelItems={params.value} expandedRows={expandedRows}
                                                              handleToggleExpand={handleToggleExpand}/>
        },
        {
            field: 'parcelStatus',
            headerName: 'Parcel Status',
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderCell: (params) => (
                <SeverityPill color={params.value === 'Packaged' ? 'success' : 'warning'}>
                    {params.value}
                </SeverityPill>
            )
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
            width: 250
        },
        {
            field: 'eCommercePlatformUrl',
            headerName: 'E-Commerce Platform Url',
            headerClassName: 'super-app-theme--header',
            width: 250
        },
        {
            field: 'expressDeliveryCompanyName',
            headerName: 'Express Delivery Company Name',
            headerClassName: 'super-app-theme--header',
            width: 300
        },
        {
            field: 'expressDeliveryCompanyType',
            headerName: 'Company Type',
            headerClassName: 'super-app-theme--header',
            width: 150
        },
        {
            field: 'expressDeliveryCompanyLocation',
            headerName: 'Company Location',
            headerClassName: 'super-app-theme--header',
            width: 400
        },
    ];

    const handleClearSelectedData = async () => {
        const result = await clearSelectedEcommerceSimulationData(selectedDataIds);
        if (result.success) {
            setRows([]);
            setIsClickSelectedToDelete(!isClickSelectedToDelete);
            toast.success('The selected Json simulation data has cleared successfully!');
        } else {
            toast.error('Ooops! Failed to clear the selected Json simulation data. Please try again!');
        }
    };

    const handleClearAllData = async () => {
        const result = await clearAllEcommerceSimulationData();
        if (result.success) {
            setRows([]);
            toast.success('All Json simulation data has cleared successfully!');
        } else {
            toast.error('Ooops! Failed to clear all Json simulation data. Please try again!');
        }
    };

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
        setSelectedDataIds(rowSelectionModel);
    };

    return (
        <>
            <Box
                sx={{
                    width: '172.9vh', height: '100%',
                    boxShadow: 20,
                    border: 5,
                    borderColor: 'primary.main',
                    borderRadius: 1.2
                }}
            >
                <DataGridTable
                    rows={rows}
                    columns={columns}
                    handleRowHeight={handleRowHeight}
                    handleRowSelectionChange={handleRowSelectionChange}
                />
                <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -2}}>
                    <Button
                        variant="text"
                        onClick={handleClearSelectedData}
                        sx={{ml: 0.8, mt: 3, mb: 1.4, fontSize: '15.8px', fontWeight: 'bold'}}
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <DeleteForeverOutlinedIcon/>
                            </SvgIcon>
                        )}
                    >
                        Clear selected Json Simulation Data
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleClearAllData}
                        sx={{ml: 0.8, mt: 3, mb: 1.4, fontSize: '15.8px', fontWeight: 'bold'}}
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <DeleteForeverOutlinedIcon/>
                            </SvgIcon>
                        )}
                    >
                        Clear all Json Simulation Data
                    </Button>
                </Paper>
            </Box>
        </>
    )
}
