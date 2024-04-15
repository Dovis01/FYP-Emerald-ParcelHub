import {useEffect, useState} from "react";
import {
    getAllStationManagersInfoDataForAdmin
} from "@/api/springboot-api";
import {
    Box,
} from "@mui/material";
import * as React from "react";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {SeverityPill} from "@/components/customized/severityPill";


export const AllStationManagersDataDisplay = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllStationManagersInfoDataForAdmin()
            const newRows = result.data.map((item) => {
                return {
                    id: item.stationManagerId,
                    fullName: item.fullName,
                    employeeCode: item.employeeCode,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    registerTime: item.registerTime,
                    stationManagerStatus: item.stationManagerStatus,
                    stationCommunityName: item.communityName,
                    stationCity: item.city,
                    stationAddress: item.address,
                    shelvesTotalNumber: item.shelvesTotalNumber,
                    stationAssignManagerStatus: item.stationAssignManagerStatus
                };
            });
            setRows(newRows);
        };

        fetchData();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Station Manager ID', headerClassName: 'super-app-theme--header', width: 165},
        {field: 'fullName', headerName: 'Full Name', headerClassName: 'super-app-theme--header', width: 120},
        {field: 'employeeCode', headerName: 'Employee Code', headerClassName: 'super-app-theme--header', width: 230},
        {field: 'startDate', headerName: 'Work Start Date', headerClassName: 'super-app-theme--header', width: 138},
        {field: 'endDate', headerName: 'Work End Date', headerClassName: 'super-app-theme--header', width: 138},
        {field: 'registerTime', headerName: 'Register Time', headerClassName: 'super-app-theme--header', width: 173},
        {
            field: 'stationManagerStatus',
            headerName: 'Manager Status',
            headerClassName: 'super-app-theme--header',
            width: 135,
            renderCell: (params) => (
                <SeverityPill color={params.value === true ? 'success' : 'warning'}>
                    {params.value === true ? 'Active' : 'Absent'}
                </SeverityPill>
            )
        },
        {field: 'stationCommunityName', headerName: 'Station Community Name', headerClassName: 'super-app-theme--header', width: 205},
        {field: 'stationCity', headerName: 'Station City', headerClassName: 'super-app-theme--header', width: 113},
        {field: 'stationAddress', headerName: 'Station Address', headerClassName: 'super-app-theme--header', width: 455},
        {field: 'shelvesTotalNumber', headerName: 'Total Num of Shelves', headerClassName: 'super-app-theme--header', width: 180},
        {
            field: 'stationAssignManagerStatus',
            headerName: 'Station Assign Status',
            headerClassName: 'super-app-theme--header',
            width: 180,
            renderCell: (params) => (
                <SeverityPill color={params.value === true ? 'success' : 'warning'}>
                    {params.value === true ? 'Unassigned' : 'Assigned'}
                </SeverityPill>
            )
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
