import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import {useTheme} from "@mui/material/styles";
import {LinearStepperFinishDialog} from "@/components/customized/linearStepper/linearStepperFinishDialog";
import {CourierFinishTodayCollectionTasks, refreshParcelsStatusInBatchForCourier} from "@/api/springboot-api";
import {toast} from "react-toastify";
import {useAuthContext} from "@/contexts/auth-context";
import {useGoogleMapContext} from "@/contexts/googleMap-context";

const steps = [
    'Ready to collect parcels',
    'In process',
    'All parcels collected',
    'Return to parcel hub',
    'All parcels In parcel hub'
];

export default function CollectionHorizontalLinearStepper({parcelsCodeList, parcelHubAddr, ResetParcelsCollectionTasks}) {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const auth = useAuthContext();
    const googleMap = useGoogleMapContext();
    const theme = useTheme();

    const refreshParcelsAndNotify = async (status, successMessage) => {
        const result = await refreshParcelsStatusInBatchForCourier(parcelsCodeList, status);
        result.success ? toast.success(successMessage) : toast.error('Ooops! ' + result.msg);
    };

    const handleNext = async () => {
        if (activeStep === 2) {
            await refreshParcelsAndNotify('Return to parcel hub', 'All parcels collected and on the way for returning to parcel hub!');
            // Then update the courier's current address to the last path point
            const lastPathPoint = googleMap.courierCollectionOverviewPaths[210]
            googleMap.updateCourierCurrentCollectionAddr({
                addressGeoInfo: {
                    latitude: lastPathPoint.lat(),
                    longitude: lastPathPoint.lng()
                }
            });
        }

        if (activeStep === 3) {
            googleMap.updateCourierCurrentCollectionAddr({
                addressGeoInfo: {
                    address: parcelHubAddr
                }
            });
            await refreshParcelsAndNotify('In parcel hub', 'All parcels returned to parcel hub!');
        }

        if (activeStep === steps.length - 1) {
            setOpen(true);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        ResetParcelsCollectionTasks();
        setActiveStep(0);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleFinishConfirm = async () => {
        const result = await CourierFinishTodayCollectionTasks(auth.user.courierId);
        if (result.success) {
            toast.success(`Thanks, ${auth.user.fullName}. You have finished the collection tasks for all parcels!`)
        } else {
            toast.error(result.msg)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setOpen(false);
    };

    return (
        <Box sx={{width: '100%', mt: 4}}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{width: '100%'}}>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (index === 2) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                ! Only Click All Confirm Collection Button !
                            </Typography>
                        );
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{mt: 1.2, mb: 0.9, ml: 6.8, fontWeight: 600}}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button
                            onClick={handleReset}
                            sx={{
                                mt: 0.5,
                                mb: 2,
                                mr: 6.8,
                                fontSize: '18px',
                                fontWeight: 'bold',
                                paddingTop: theme.spacing(0.6),
                                paddingBottom: theme.spacing(0.6)
                            }}
                        >
                            Reset
                        </Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography
                        sx={{mt: 1.2, mb: 0.9, ml: 6.8, fontWeight: 600}}
                    >
                        Now - Step {activeStep + 1}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 0.5, pb: 2}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                                ml: 4.8,
                                fontSize: '18px',
                                fontWeight: 'bold',
                                paddingTop: theme.spacing(0.6),
                                paddingBottom: theme.spacing(0.6)
                            }}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button
                            onClick={handleNext}
                            sx={{
                                mr: 6.8,
                                fontSize: '18px',
                                fontWeight: 'bold',
                                paddingTop: theme.spacing(0.6),
                                paddingBottom: theme.spacing(0.6)
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        <LinearStepperFinishDialog open={open}
                                                   handleDialogClose={handleDialogClose}
                                                   handleFinishConfirm={handleFinishConfirm}
                                                   taskType={'Collection'}/>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
