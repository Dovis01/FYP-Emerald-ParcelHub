import {
    Box,
    Button,
    Dialog,
    DialogActions, FormControlLabel,
    Grow, Radio, RadioGroup, Typography
} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import {sendInformationNotificationData} from "@/api/springboot-api";
import {toast} from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return (
        <Grow
            ref={ref}
            style={{transformOrigin: '0 0 0'}}
            {...props}
            timeout={600}
        />
    );
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} sx={{overflow: 'auto'}}/>
        </Draggable>
    );
}

export const InformCustomerButtonRenderer = ({row, handleInformStatusTextChange}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [checkedOption, setCheckedOption] = useState('phone');
    const sendInfoObj = {
        targetPhone: row.customerPhoneNumber,
        phoneMessage: `【Emerald Parcel Hub】Dear ${row.customerFullName}, your parcel with pickup code ${row.parcelPickupCode} is ready for pickup at our station. The station address is ${row.parcelStationAddress}. Please come to pick it up as soon as possible. Thank you!👍`,
        toAddress: row.customerOrderEmail,
        customerName: row.customerFullName,
        stationAddress: row.parcelStationAddress,
        pickupCode: row.parcelPickupCode,
    }

    const handleDialogOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleConfirmInform = async () => {
        console.log('Informing customer by: ', checkedOption);
        const result = await sendInformationNotificationData(sendInfoObj, checkedOption);
        if (result.success) {
            toast.success(`Successfully informed the customer by ${checkedOption}!`);
            handleInformStatusTextChange(row.id, 'Informed');
        }else{
            toast.error(`Ooops! Failed to inform the customer by ${checkedOption}!`);
            handleInformStatusTextChange(row.id, 'Send failed');
        }
        setOpen(false);
    }

    return (
        <>
            <Button
                startIcon={<SettingsRemoteIcon/>}
                onClick={handleDialogOpen}
                sx={{
                    backgroundColor: theme.palette["primary"].alpha18,
                    paddingLeft: theme.spacing(2.1),
                    paddingRight: theme.spacing(2.1),
                    paddingTop: theme.spacing(0.4),
                    paddingBottom: theme.spacing(0.4),
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    letterSpacing: 0.4,
                    fontWeight: 'bold',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.pxToRem(13.2),
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase'
                }}
            >
                Inform
            </Button>
            <Dialog
                fullWidth
                open={open}
                maxWidth={'xs'}
                TransitionComponent={Transition}
                keepMounted
                PaperComponent={PaperComponent}
                onClose={handleDialogClose}
                aria-labelledby="draggable-dialog-title"
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar style={{cursor: 'move'}} id="draggable-dialog-title">
                        <Typography sx={{flex: 1}} variant="h6" component="div">
                            Informing Customer {'->'} {row.customerFullName}
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleDialogClose}
                            aria-label="close"
                            sx={{mr: -4}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6"
                                sx={{pt: 4, pb: 1.5, px: 5}}>
                        Choose the way to inform:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}
                    >
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={checkedOption}
                            onChange={(event) => setCheckedOption(event.target.value)}
                        >
                            <FormControlLabel value="phone" control={<Radio />} label="By phone number" />
                            <FormControlLabel value="email" control={<Radio />} label="By email address" />
                        </RadioGroup>
                    </Box>
                </Box>
                <DialogActions sx={{mt:2, mb: 1.4}}>
                    <Button
                        onClick={handleConfirmInform}
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingTop: theme.spacing(0.6),
                            paddingBottom: theme.spacing(0.6),
                            '&:hover': {
                                backgroundColor: theme.palette.customized.purple,
                            },
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleDialogClose}
                        sx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingTop: theme.spacing(0.6),
                            paddingBottom: theme.spacing(0.6),
                            '&:hover': {
                                backgroundColor: theme.palette.customized.purple,
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
