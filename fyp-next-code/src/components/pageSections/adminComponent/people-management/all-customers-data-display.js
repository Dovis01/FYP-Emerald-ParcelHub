import {useEffect, useState} from "react";
import {
    getAllCustomersInfoDataForAdmin
} from "@/api/springboot-api";
import {
    Box,
} from "@mui/material";
import * as React from "react";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {SeverityPill} from "@/components/customized/severityPill";


export const AllCustomersDataDisplay = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCustomersInfoDataForAdmin()
            const newRows = result.data.map((item) => {
                return {
                    id: item.customerId,
                    fullName: item.fullName,
                    username: item.username,
                    phoneNumber: item.phoneNumber,
                    orderEmail: item.orderEmail,
                    accountEmail: item.email,
                    country: item.country,
                    city: item.city,
                    address: item.address,
                    accountRegisterTime: item.registerTime,
                    accountUpdateTime: item.updateTime,
                    accountStatus: item.status
                };
            });
            setRows(newRows);
        };

        fetchData();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Customer ID', headerClassName: 'super-app-theme--header', width: 111},
        {field: 'fullName', headerName: 'Full Name', headerClassName: 'super-app-theme--header', width: 125},
        {field: 'username', headerName: 'Username', headerClassName: 'super-app-theme--header', width: 123},
        {field: 'phoneNumber', headerName: 'Phone Number', headerClassName: 'super-app-theme--header', width: 165},
        {field: 'orderEmail', headerName: 'Order Email Address', headerClassName: 'super-app-theme--header', width: 225},
        {field: 'accountEmail', headerName: 'Account Email Address', headerClassName: 'super-app-theme--header', width: 225},
        {field: 'country', headerName: 'Country', headerClassName: 'super-app-theme--header', width: 92},
        {field: 'city', headerName: 'City', headerClassName: 'super-app-theme--header', width: 90},
        {field: 'address', headerName: 'Address', headerClassName: 'super-app-theme--header', width: 440},
        {field: 'accountRegisterTime', headerName: 'Account Register Time', headerClassName: 'super-app-theme--header', width: 190},
        {field: 'accountUpdateTime', headerName: 'Account Update Time', headerClassName: 'super-app-theme--header', width: 190},
        {
            field: 'accountStatus',
            headerName: 'Account Status',
            headerClassName: 'super-app-theme--header',
            width: 157,
            renderCell: (params) => {
                return params.value !== null ? (
                    <SeverityPill color={params.value === true ? 'success' : 'error'}>
                        {params.value === true ? 'Active' : 'Disabled'}
                    </SeverityPill>
                ) : (
                    <SeverityPill color='warning'>
                        Unregistered
                    </SeverityPill>
                )
            }
        }
    ];

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
                />
            </Box>
        </>
    )
}
