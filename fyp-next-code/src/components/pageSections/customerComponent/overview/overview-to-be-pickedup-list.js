import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon, Typography
} from '@mui/material';
import {Scrollbar} from "@/components/customized/scrollbar";
import {useEffect, useState} from "react";
import {useAuthContext} from "@/contexts/auth-context";
import {getParcelPickupCodesByCustomerId} from "@/api/springboot-api";

export const OverviewToBePickedUpList = () => {
    const {user} = useAuthContext();
    const [pickupCodes, setPickupCodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getParcelPickupCodesByCustomerId(user?.customerId);
            if (result.success) setPickupCodes(result.data);
        };
        fetchData();
    }, [user?.customerId]);

    return (
        <Card sx={{height: '100%', ml: 1.5}}>
            <CardHeader title="The list of parcels to be picked up"/>
            <Scrollbar sx={{flexGrow: 1, maxHeight: '430px', overflowY: 'auto', overflowX: 'hidden'}}>
                <List sx={{ml: 1.1,mt:-1}}>
                    {pickupCodes.map((code, index) => {
                        const hasDivider = index < pickupCodes.length - 1;
                        return (
                            <ListItem
                                divider={hasDivider}
                                key={"pickup-" + index}
                            >
                                <ListItemAvatar>
                                    <Box
                                        sx={{
                                            borderRadius: '35%',
                                            backgroundColor: 'customized.purpleDark',
                                            color: 'white',
                                            height: 45,
                                            width: 45,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            {index+1}
                                        </Typography>
                                    </Box>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Parcel Pickup Code: ${code}`}
                                    primaryTypographyProps={{variant: 'subtitle1'}}
                                    secondary={`Updated By Emerald Parcel Hub`}
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
        </Card>
    );
};

