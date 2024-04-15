import {useEffect, useState} from "react";
import {
    getAllCompanyEmployeesInfoDataForAdmin
} from "@/api/springboot-api";
import {
    Box,
} from "@mui/material";
import * as React from "react";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {SeverityPill} from "@/components/customized/severityPill";


export const AllEmployeesDataDisplay = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCompanyEmployeesInfoDataForAdmin()
            const newRows = result.data.map((item) => {
                return {
                    id: item.employeeId,
                    fullName: item.fullName,
                    roleType: item.roleType,
                    employeeCode: item.employeeCode,
                    username: item.username,
                    phoneNumber: item.phoneNumber,
                    email: item.email,
                    country: item.country,
                    city: item.city,
                    companyName: item.companyName,
                    companyType: item.companyType,
                    companyAddress: item.address,
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
        {field: 'id', headerName: 'Employee ID', headerClassName: 'super-app-theme--header', width: 111},
        {field: 'fullName', headerName: 'Full Name', headerClassName: 'super-app-theme--header', width: 120},
        {field: 'roleType', headerName: 'Role Type', headerClassName: 'super-app-theme--header', width: 150},
        {field: 'employeeCode', headerName: 'Employee Code', headerClassName: 'super-app-theme--header', width: 240},
        {field: 'username', headerName: 'Username', headerClassName: 'super-app-theme--header', width: 130},
        {field: 'phoneNumber', headerName: 'Phone Number', headerClassName: 'super-app-theme--header', width: 165},
        {field: 'email', headerName: 'Email Address', headerClassName: 'super-app-theme--header', width: 225},
        {field: 'country', headerName: 'Country', headerClassName: 'super-app-theme--header', width: 100},
        {field: 'city', headerName: 'City', headerClassName: 'super-app-theme--header', width: 105},
        {field: 'companyName', headerName: 'Parcel Hub Company Name', headerClassName: 'super-app-theme--header', width: 340},
        {field: 'companyType', headerName: 'Company Type', headerClassName: 'super-app-theme--header', width: 145},
        {field: 'companyAddress', headerName: 'CompanyAddress', headerClassName: 'super-app-theme--header', width: 430},
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
