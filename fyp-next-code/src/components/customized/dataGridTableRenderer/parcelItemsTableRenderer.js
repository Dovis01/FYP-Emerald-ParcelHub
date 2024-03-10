import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as React from "react";

export const ParcelItemsTableRenderer = ({parcelItems,expandedRows,handleToggleExpand}) => {
    return(
        <>
            <Typography variant="body2" component="span">
                More...
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
                            <TableRow key={parcelItems[0].parentId}>
                                <TableCell>{parcelItems[0].parcelLength}</TableCell>
                                <TableCell>{parcelItems[0].parcelWidth}</TableCell>
                                <TableCell>{parcelItems[0].parcelHeight}</TableCell>
                                <TableCell align="right">{parcelItems[0].parcelWeight}</TableCell>
                                <TableCell align="right">{parcelItems[0].parcelVolume}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </>
    );
}
