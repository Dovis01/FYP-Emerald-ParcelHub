import * as React from "react";
import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const ParcelStationTableRenderer = ({stationData, expandedRows, handleToggleExpand}) => {
    const stationEntries = Object.entries(stationData.value).map(([key, value]) => ({
        key: key.replace('station', ''),
        value,
    }));

    return (
        <>
            <Typography variant="body2" component="span">
                More...
            </Typography>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleToggleExpand(stationData.row.stationId)}
            >
                {expandedRows[stationData.row.stationId] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
            <Collapse in={expandedRows[stationData.row.stationId]} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={2}>Station Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stationEntries.map(({key, value}) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row">{key}</TableCell>
                                    <TableCell align="right">{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </>
    );
}
