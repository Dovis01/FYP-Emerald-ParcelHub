import {
    Button,
} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {useState} from "react";
import {LinearStepperFinishDialog} from "@/components/customized/linearStepper/linearStepperFinishDialog";

export const StationConfirmPickupButtonRenderer = ({row, handleConfirmPickupForParcel}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDialogOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleFinishConfirm = () => {
        handleConfirmPickupForParcel(row.id);
        handleDialogClose();
    }

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
            <LinearStepperFinishDialog open={open}
                                       handleDialogClose={handleDialogClose}
                                       handleFinishConfirm={handleFinishConfirm}
                                       taskType={'Confirm Pickup'}/>
        </>
    );
}
