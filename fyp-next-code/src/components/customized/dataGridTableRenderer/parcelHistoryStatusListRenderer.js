import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const ParcelHistoryStatusListRenderer = ({statusData, expandedRows, handleToggleExpand}) => {
    return(
        <>
            <Typography variant="body2" component="span">
                More History Status...
            </Typography>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleToggleExpand(statusData.row.parcelId)}
            >
                {expandedRows[statusData.row.parcelId] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
            <Collapse in={expandedRows[statusData.row.parcelId]} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Parcel Status Info</TableCell>
                                <TableCell align="right">Update TimeStamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {statusData.value.map((parcelHistoryStatus) => (
                                <TableRow key={parcelHistoryStatus.id}>
                                    <TableCell component="th" scope="row">
                                        {parcelHistoryStatus.statusInfo}
                                    </TableCell>
                                    <TableCell>{parcelHistoryStatus.updatedTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </>
    );
}
