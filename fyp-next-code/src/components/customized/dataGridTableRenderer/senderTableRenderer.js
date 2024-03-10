import * as React from "react";
import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const SenderTableRenderer = ({senderData, expandedRows, handleToggleExpand}) => {
    const senderEntries = Object.entries(senderData.value).map(([key, value]) => ({
        key: key.replace('sender', ''),
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
                onClick={() => handleToggleExpand(senderData.row.senderId)}
            >
                {expandedRows[senderData.row.senderId] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
            <Collapse in={expandedRows[senderData.row.senderId]} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={2}>Sender Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {senderEntries.map(({key, value}) => (
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
