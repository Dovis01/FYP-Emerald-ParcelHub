import {formatDistanceToNow} from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon
} from '@mui/material';
import {Scrollbar} from "@/components/customized/scrollbar";

export const OverviewLatestInventory = (props) => {
    const {products = [], sx} = props;

    return (
        <Card sx={{...sx, ml: 1.5}}>
            <CardHeader title="Latest Inventories"/>
            <Scrollbar sx={{flexGrow: 1, maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden'}}>
                <List sx={{ml: 1.1}}>
                    {products.map((product, index) => {
                        const hasDivider = index < products.length - 1;
                        const ago = formatDistanceToNow(product.updatedAt);

                        return (
                            <ListItem
                                divider={hasDivider}
                                key={product.id}
                            >
                                <ListItemAvatar>
                                    {
                                        product.image
                                            ? (
                                                <Box
                                                    component="img"
                                                    src={product.image}
                                                    sx={{
                                                        borderRadius: 1,
                                                        height: 48,
                                                        width: 48
                                                    }}
                                                />
                                            )
                                            : (
                                                <Box
                                                    sx={{
                                                        borderRadius: 1,
                                                        backgroundColor: 'neutral.200',
                                                        height: 48,
                                                        width: 48
                                                    }}
                                                />
                                            )
                                    }
                                </ListItemAvatar>
                                <ListItemText
                                    primary={product.name}
                                    primaryTypographyProps={{variant: 'subtitle1'}}
                                    secondary={`Updated ${ago} ago`}
                                    secondaryTypographyProps={{variant: 'body2'}}
                                />
                                <IconButton edge="end">
                                    <SvgIcon>
                                        <EllipsisVerticalIcon/>
                                    </SvgIcon>
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
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

OverviewLatestInventory.propTypes = {
    products: PropTypes.array,
    sx: PropTypes.object
};
