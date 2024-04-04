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
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

export const LinearStepperFinishDialog = ({open, handleDialogClose, handleFinishConfirm, taskType}) => {
    const theme = useTheme();

    return (
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
                    Finish {taskType} Tasks
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
                        Are you sure to have finished the {taskType.toString().toLowerCase()} tasks of all parcels?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{mb: 0.8}}>
                    <Button
                        onClick={handleFinishConfirm}
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
    );
}
