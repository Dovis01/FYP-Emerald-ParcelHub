import {format} from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import {Scrollbar} from '@/components/customized/scrollbar';
import {SeverityPill} from '@/components/customized/severityPill';

const statusMap = {
    pending: 'warning',
    informed: 'success',
    uninformed: 'error'
};

export const OverviewLatestRecords = (props) => {
    const {orders = [], sx} = props;

    return (
        <Card sx={{...sx, ml: 4}}>
            <CardHeader title="Latest Receipt Records"/>
            <Scrollbar sx={{flexGrow: 1,maxHeight: '500px', overflowY: 'auto' ,overflowX: 'hidden' }}>
                <Box sx={{width: 1000}}>
                    <Table sx={{ml: 1.2}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Order
                                </TableCell>
                                <TableCell>
                                    Customer
                                </TableCell>
                                <TableCell sortDirection="desc">
                                    Date
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => {
                                const createdAt = format(order.createdAt, 'dd/MM/yyyy');
                                return (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>
                                            {order.ref}
                                        </TableCell>
                                        <TableCell>
                                            {order.customer.name}
                                        </TableCell>
                                        <TableCell>
                                            {createdAt}
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={statusMap[order.status]}>
                                                {order.status}
                                            </SeverityPill>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end',mt:0.4,mb:0.8}}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon/>
                        </SvgIcon>
                    )}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    );
};

OverviewLatestRecords.prototype = {
    orders: PropTypes.array,
    sx: PropTypes.object
};
