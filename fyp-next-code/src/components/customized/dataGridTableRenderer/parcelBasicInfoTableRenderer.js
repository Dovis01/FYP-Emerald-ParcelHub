import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as React from "react";

export const ParcelBasicInfoTableRenderer = ({parcelInfo,expandedRows,handleToggleExpand}) => {
    return(
        <>
            <Typography variant="body2" component="span">
                More...
            </Typography>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleToggleExpand(parcelInfo.parcelId)}
            >
                {expandedRows[parcelInfo.parcelId] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
            <Collapse in={expandedRows[parcelInfo.parcelId]} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Length (m)</TableCell>
                                <TableCell>Width (m)</TableCell>
                                <TableCell>Height (m)</TableCell>
                                <TableCell>Total Weight (kg)</TableCell>
                                <TableCell>Total Volume (m³)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={parcelInfo.parcelId}>
                                <TableCell>{parcelInfo.parcelLength}</TableCell>
                                <TableCell>{parcelInfo.parcelWidth}</TableCell>
                                <TableCell>{parcelInfo.parcelHeight}</TableCell>
                                <TableCell align="right">{parcelInfo.parcelWeight}</TableCell>
                                <TableCell align="right">{parcelInfo.parcelVolume}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </>
    );
}
