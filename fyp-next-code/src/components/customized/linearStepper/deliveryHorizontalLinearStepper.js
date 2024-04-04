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
import {CourierFinishTodayDeliveryTasks, refreshParcelsStatusInBatchForCourier} from "@/api/springboot-api";
import {toast} from "react-toastify";
import {useAuthContext} from "@/contexts/auth-context";
import {useGoogleMapContext} from "@/contexts/googleMap-context";

const steps = [
    'Ready to deliver parcels',
    'In transit',
    'All parcels delivered',
    'Return to parcel hub',
    'Arrive at parcel hub'
];

export default function DeliveryHorizontalLinearStepper({parcelsCodeList, parcelHubAddr, ResetParcelsDeliveryTasks}) {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const auth = useAuthContext();
    const googleMap = useGoogleMapContext();
    const theme = useTheme();

    const handleNext = async () => {
        if(activeStep === 0) {
            const result = await refreshParcelsStatusInBatchForCourier(parcelsCodeList, "In transit");
            if (result.success) {
                toast.success('All parcels are on the way for delivery!');
            } else {
                toast.error('Ooops! ' + result.msg);
            }
        }

        if (activeStep === 2) {
            // Update the courier's current address to the last path point
            try {
                const lastPathPoint = googleMap.courierDeliveryOverviewPaths[210]
                googleMap.updateCourierCurrentDeliveryAddr({
                    addressGeoInfo: {
                        latitude: lastPathPoint.lat(),
                        longitude: lastPathPoint.lng()
                    }
                });
                toast.success('All parcels delivered and on the way for returning to parcel hub!');
            } catch (e) {
                toast.error('Failed to update the courier\'s current address to the last path point!')
            }
        }

        if (activeStep === 3) {
            try {
                googleMap.updateCourierCurrentDeliveryAddr({
                    addressGeoInfo: {
                        address: parcelHubAddr
                    }
                });
                toast.success('Returned to parcel hub!');
            } catch (e) {
                toast.error('Failed to update the courier\'s current address to the parcel hub address!')
            }
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
        ResetParcelsDeliveryTasks();
        setActiveStep(0);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleFinishConfirm = async () => {
        const result = await CourierFinishTodayDeliveryTasks(auth.user.courierId);
        if (result.success) {
            toast.success(`Thanks, ${auth.user.fullName}. You have finished the delivery tasks for all parcels!`)
        } else {
            toast.error(result.msg)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setOpen(false);
    };

    return (
        <Box sx={{width: '100%', mt: 4}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{width: '102%'}}>
                    {steps.map((label, index) => {
                        const labelProps = {};
                        if (index === 2) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    ! Only Click All Confirm Delivery Button !
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
            </Box>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{mt: 1.2, mb: 0.9, ml: 7.4, fontWeight: 600}}>
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
                        sx={{mt: 1.2, mb: 0.9, ml: 7.4, fontWeight: 600}}
                    >
                        Now - Step {activeStep + 1}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 0.5, pb: 2}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                                ml: 5.4,
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
                                mr: 7.2,
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
                                                   taskType={'Delivery'}/>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
