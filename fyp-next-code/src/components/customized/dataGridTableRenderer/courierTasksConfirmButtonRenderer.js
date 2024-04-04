import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Slide
} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {toast} from "react-toastify";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import {useState} from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {refreshParcelsStatusForCourier} from "@/api/springboot-api";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export const CourierTasksConfirmButtonRenderer = ({row, statusInfo, taskType}) => {
    const theme = useTheme();
    const googleMap = useGoogleMapContext();
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
        if (taskType === 'Collection') {
            googleMap.updateCourierCurrentCollectionAddr({
                addressGeoInfo: {
                    address: row.senderInfo.senderAddress
                }
            });
        }

        if(taskType === 'Delivery') {
            googleMap.updateCourierCurrentDeliveryAddr({
                addressGeoInfo: {
                    address: row.stationInfo.stationAddress
                }
            });
        }
        const result = await refreshParcelsStatusForCourier(row.parcelTrackingCode, statusInfo);
        if (result.success) {
            toast.success(`Parcel tracking code for ${row.parcelTrackingCode} confirmed to ${statusInfo.toString().toLowerCase()}!`)
        } else {
            toast.error(result.msg)
        }
        setOpen(false);
    };

    const handleDialogOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                startIcon={<DoneOutlineIcon/>}
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
                Confirm
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'md'}
                PaperComponent={PaperComponent}
                onClose={handleDialogClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{cursor: 'move', fontSize: '20px'}} id="draggable-dialog-title">
                    Confirm {taskType} Task
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.primary.main,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <Divider sx={{borderColor: theme.palette.primary.main}}/>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" sx={{fontWeight: 'bold'}}>
                        Are you sure to confirm the {taskType.toString().toLowerCase()} of parcel tracking
                        code {row.parcelTrackingCode}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{mb: 0.8}}>
                    <Button
                        onClick={handleConfirm}
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
}
