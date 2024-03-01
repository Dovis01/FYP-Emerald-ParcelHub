import {useEffect, useState} from "react";
import {
    clearAllEcommerceSimulationData,
    clearSelectedEcommerceSimulationData,
    getAllEcommerceSimulationData
} from "@/api/springboot-api";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {
    Box,
    Button,
    Collapse,
    Paper,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import * as React from "react";
import {toast} from "react-toastify";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {SeverityPill} from "@/components/customized/severityPill";


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
                }));

                return {
                    id: item.ecommerce_json_data_id,
                    orderId: item.order_id,
                    orderDate: item.order_date,
                    customerName: item.customer.name,
                    customerPhone: item.customer.phone,
                    customerEmail: item.customer.email,
                    customerAddress: item.customer.address,
                    senderName: item.sender.name,
                    senderPhone: item.sender.phone,
                    senderEmail: item.sender.email,
                    senderAddress: item.sender.address,
                    deliveryStatus: item.delivery.status,
                    expectedDeliveryDate: item.delivery.expected_delivery_date,
                    eCommercePlatformName: item.e_commerce_platform.name,
                    eCommercePlatformUrl: item.e_commerce_platform.website_url,
                    expressDeliveryCompanyName: item.express_delivery_company.company_name,
                    expressDeliveryCompanyType: item.express_delivery_company.companyType,
                    expressDeliveryCompanyLocation: item.express_delivery_company.location,
                    parcelItems: parcelItemsRows,
                    parcelWeight: item.parcel.weight,
                    parcelVolume: item.parcel.volume,
                };
            });
            setRows(newRows.flat());
        };

        fetchJsonData().then().catch((error) => {
            console.log('Error fetching Json data:', error);
        });
    }, [isClickSelectedToDelete]);

    const columns = [
        {field: 'id', headerName: 'Data ID', headerClassName: 'super-app-theme--header', width: 90},
        {field: 'orderId', headerName: 'Order ID', headerClassName: 'super-app-theme--header', width: 110},
        {field: 'orderDate', headerName: 'Order Date', headerClassName: 'super-app-theme--header', width: 190},
        {field: 'customerName', headerName: 'Customer Name', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'customerPhone', headerName: 'Customer Phone', headerClassName: 'super-app-theme--header', width: 170},
        {field: 'customerEmail', headerName: 'Customer Email', headerClassName: 'super-app-theme--header', width: 240},
        {
            field: 'customerAddress',
            headerName: 'Customer Address',
            headerClassName: 'super-app-theme--header',
            width: 270
        },
        {field: 'senderName', headerName: 'Sender Name', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'senderPhone', headerName: 'Sender Phone', headerClassName: 'super-app-theme--header', width: 160},
        {field: 'senderEmail', headerName: 'Sender Email', headerClassName: 'super-app-theme--header', width: 160},
        {field: 'senderAddress', headerName: 'Sender Address', headerClassName: 'super-app-theme--header', width: 280},
        {
            field: 'parcelItems',
            headerName: 'Parcel Items',
            width: isExpandedColumn ? 660 : 150,
            renderCell: (params) => <ParcelItemsRenderer parcelItems={params.value}/>
        },
        {
            field: 'parcelWeight',
            headerName: 'Parcel Total Weight (kg)',
            headerClassName: 'super-app-theme--header',
            width: 190
        },
        {
            field: 'parcelVolume',
            headerName: 'Parcel Total Volume (m³)',
            headerClassName: 'super-app-theme--header',
            width: 190
        },
        {
            field: 'deliveryStatus',
            headerName: 'Delivery Status',
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderCell: (params) => (
                <SeverityPill color={params.value === 'Received' ? 'success' : 'warning'}>
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

    // Parcel Items 渲染器
    const ParcelItemsRenderer = ({parcelItems}) => (
        <>
            <Typography variant="body2" component="span">
                More details
            </Typography>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleToggleExpand(parcelItems[0].parentId)}
            >
                {expandedRows[parcelItems[0].parentId] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
            <Collapse in={expandedRows[parcelItems[0].parentId]} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item ID</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parcelItems.map((parcelItem) => (
                                <TableRow key={parcelItem.id}>
                                    <TableCell component="th" scope="row">
                                        {parcelItem.id}
                                    </TableCell>
                                    <TableCell>{parcelItem.description}</TableCell>
                                    <TableCell align="right">{parcelItem.quantity}</TableCell>
                                    <TableCell align="right">{parcelItem.weight}</TableCell>
                                    <TableCell align="right">{parcelItem.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </>
    );

    const handleRowHeight = (params) => {
        return expandedRows[params.id] ? params.model.parcelItems.length * 96 : 52;
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
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    checkboxSelection
                    slots={{toolbar: GridToolbar}}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 10}},
                    }}
                    getRowHeight={handleRowHeight}
                    onRowSelectionModelChange={handleRowSelectionChange}
                    pageSizeOptions={[5, 10, 25]}
                    sx={{
                        boxShadow: 5,
                        backgroundColor: 'white',
                        '& .MuiDataGrid-columnHeaders.MuiDataGrid-withBorderColor': {
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            backgroundColor: 'customized.purple',
                        },
                        '& .MuiDataGrid-toolbarContainer .MuiButtonBase-root': {
                            fontSize: '16px',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'customized.purple',
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'customized.blueLight',
                        },
                        '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': {
                            backgroundColor: 'customized.blueLight',
                            color: 'primary.main',
                        },

                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                            width: '5px',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                            width: '2px',
                            backgroundColor: '#f1f1f1',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                            backgroundColor: '#a2a0a0',
                            borderRadius: '20px',
                            border: '6.5px solid transparent',
                            backgroundClip: 'content-box',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#7c7a7a',
                        },
                        '& .super-app-theme--header': {
                            fontWeight: 'bold',
                            fontSize: '14.8px'
                        }
                    }}
                />
                <Paper sx={{display: 'flex', justifyContent: 'flex-end', mt: -2}}>
                    <Button
                        variant="text"
                        onClick={handleClearSelectedData}
                        sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
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
                        sx={{ml: 0.8, mt: 1, mb: 2.1, fontSize: '15.8px', fontWeight: 'bold'}}
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
