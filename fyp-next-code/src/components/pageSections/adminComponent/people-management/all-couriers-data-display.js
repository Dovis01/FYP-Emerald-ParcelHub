import {useEffect, useState} from "react";
import {
    getAllCouriersInfoDataForAdmin
} from "@/api/springboot-api";
import {
    Box,
} from "@mui/material";
import * as React from "react";
import {DataGridTable} from "@/components/customized/dataGridTableRenderer/dataGridTable";
import {SeverityPill} from "@/components/customized/severityPill";


export const AllCouriersDataDisplay = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCouriersInfoDataForAdmin()
            const newRows = result.data.map((item) => {
                return {
                    id: item.courierId,
                    fullName: item.fullName,
                    employeeCode: item.employeeCode,
                    workType: item.workType,
                    dailyMaxDistributionParcelsNum: item.dailyMaxDistributionParcelsNum,
                    remainingParcelsNumToDistribute: item.remainingParcelsNumToDistribute,
                    registerTime: item.registerTime,
                    courierStatus: item.courierStatus,
                    truckType: item.truckType,
                    truckPlateNumber: item.truckPlateNumber,
                    storageAreaHeight: item.storageAreaHeight,
                    storageAreaLength: item.storageAreaLength,
                    storageAreaWidth: item.storageAreaWidth,
                    maxVolume: item.volume,
                    maxWeight: item.maxWeight,
                    truckStatus: item.truckStatus,
                };
            });
            setRows(newRows);
        };

        fetchData();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Courier ID', headerClassName: 'super-app-theme--header', width: 100},
        {field: 'fullName', headerName: 'Full Name', headerClassName: 'super-app-theme--header', width: 115},
        {field: 'employeeCode', headerName: 'Employee Code', headerClassName: 'super-app-theme--header', width: 235},
        {field: 'workType', headerName: 'Work Type', headerClassName: 'super-app-theme--header', width: 140},
        {field: 'dailyMaxDistributionParcelsNum', headerName: 'Max Assigned Parcels', headerClassName: 'super-app-theme--header', width: 190},
        {field: 'remainingParcelsNumToDistribute', headerName: 'Remaining Parcels to Assign', headerClassName: 'super-app-theme--header', width: 228},
        {field: 'registerTime', headerName: 'Register Time', headerClassName: 'super-app-theme--header', width: 175},
        {
            field: 'courierStatus',
            headerName: 'Courier Status',
            headerClassName: 'super-app-theme--header',
            width: 130,
            renderCell: (params) => (
                <SeverityPill color={params.value === true ? 'success' : 'warning'}>
                    {params.value === true ? 'Active' : 'Absent'}
                </SeverityPill>
            )
        },
        {field: 'truckType', headerName: 'Truck Type', headerClassName: 'super-app-theme--header', width: 105},
        {field: 'truckPlateNumber', headerName: 'Truck Plate Number', headerClassName: 'super-app-theme--header', width: 170},
        {field: 'storageAreaHeight', headerName: 'Storage Area Height (m)', headerClassName: 'super-app-theme--header', width: 200},
        {field: 'storageAreaLength', headerName: 'Storage Area Length (m)', headerClassName: 'super-app-theme--header', width: 200},
        {field: 'storageAreaWidth', headerName: 'Storage Area Width (m)', headerClassName: 'super-app-theme--header', width: 200},
        {field: 'maxVolume', headerName: 'Max Volume (m³)', headerClassName: 'super-app-theme--header', width: 150},
        {field: 'maxWeight', headerName: 'Max Weight (kg)', headerClassName: 'super-app-theme--header', width: 150},
        {
            field: 'truckStatus',
            headerName: 'Truck Status',
            headerClassName: 'super-app-theme--header',
            width: 200,
            renderCell: (params) => {
                return params.value !== null ? (
                    <SeverityPill color={params.value === true ? 'success' : 'warning'}>
                        {params.value === true ? 'Free' : 'In Use'}
                    </SeverityPill>
                ) : (
                    <SeverityPill color='error'>
                        No Truck Assigned
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
