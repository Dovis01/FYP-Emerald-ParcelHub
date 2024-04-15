import {
    Box,
    Button,
    Dialog,
    DialogActions,
    FormControl, FormHelperText, Grow, InputLabel,Select,
    TextField, Typography, Unstable_Grid2 as Grid
} from "@mui/material";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/system";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getShelvesStorageDataOfParcelStation, placeOneParcelToParcelStationShelf} from "@/api/springboot-api";

const CustomScrollMenu = styled('div')({
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#5e5e5e',
    }
});

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
            <Paper {...props} sx={{height: '68%', overflow: 'auto'}}/>
        </Draggable>
    );
}

export const StationParcelsStorageButtonRenderer = ({row, updateFetchFlag}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [stationShelvesData, setStationShelvesData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getShelvesStorageDataOfParcelStation(row.stationId);
            if (!result.success) {
                toast.error("Ooops! Failed to fetch the station shelves storage data!");
                return;
            }
            if (Object.keys(result.data).length > 0) {
                setStationShelvesData(result.data);
            } else {
                toast.warning("Ooops! The station shelves storage space is full!");
            }
        }

        if (open) {
            fetchData();
        }
    }, [open]);

    const formik = useFormik({
        initialValues: {
            mainShelfSerialNumber: '',
            floorSerialNumber: '',
            maxParcelsNumToStore: '',
            submit: null
        },
        validationSchema: Yup.object({
            mainShelfSerialNumber: Yup
                .string()
                .required('Main Shelf Serial Number is required!'),
            floorSerialNumber: Yup
                .string()
                .required('Floor Serial Number is required!'),
            maxParcelsNumToStore: Yup
                .string()
                .required('The Number Of Stored Parcels is required!')
        }),
        onSubmit: async (values, helpers) => {
            try {
                let result = await placeOneParcelToParcelStationShelf(row.parcelId, values, row.stationId);
                if (result.success) {
                    toast.success("The parcel is placed successfully!");
                    updateFetchFlag();
                } else {
                    toast.error("Ooops! " + result.msg);
                }
                setOpen(false);
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    const mainShelfSerialNumbers = Object.keys(stationShelvesData).map((shelfNumber) => ({
        label: `Shelf ${shelfNumber}`,
        value: shelfNumber
    }));

    const getFloorSerialNumbers = (mainShelfSerialNumber) => {
        // Some undefined situations to handle
        if (!mainShelfSerialNumber || !stationShelvesData[mainShelfSerialNumber]) {
            return [];
        }
        return Object.keys(stationShelvesData[mainShelfSerialNumber]).map((floorNumber) => ({
            label: `Floor ${floorNumber}`,
            value: floorNumber
        }));
    };

    const getNumOfStoredParcels = (mainShelfSerialNumber, floorSerialNumber) => {
        // Some undefined situations to handle
        if (!mainShelfSerialNumber || !floorSerialNumber) return '';
        return stationShelvesData[mainShelfSerialNumber][floorSerialNumber] || '';
    };

    const handleDialogOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    // Monitor mainShelfSerialNumber changes
    const handleMainShelfSerialNumberChange = (event) => {
        const value = event.target.value;
        formik.setFieldValue('mainShelfSerialNumber', value);
        formik.setFieldValue('floorSerialNumber', ''); // reset floorSerialNumber
        formik.setFieldValue('maxParcelsNumToStore', ''); // reset maxParcelsNumToStore
    };

    // Monitor floorSerialNumber changes
    const handleFloorSerialNumberChange = (event) => {
        const value = event.target.value;
        formik.setFieldValue('floorSerialNumber', value);
        const maxParcelsNumToStore = getNumOfStoredParcels(formik.values.mainShelfSerialNumber, value);
        formik.setFieldValue('maxParcelsNumToStore', maxParcelsNumToStore);
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
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth={'lg'}
                PaperComponent={PaperComponent}
                onClose={handleDialogClose}
                aria-labelledby="draggable-dialog-title"
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar style={{cursor: 'move'}} id="draggable-dialog-title">
                        <Typography sx={{flex: 1}} variant="h6" component="div">
                            Placing the Parcel for {row.parcelTrackingCode}
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
                }}>
                    <Typography variant="h6"
                                sx={{pt: 5, pb: 3, px: 5}}>
                        Parcel Basic Information
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Grid
                            sx={{width: '92%'}}
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <TextField
                                    fullWidth
                                    helperText="You can not change this field"
                                    label="Parcel Length"
                                    name="parcelLength"
                                    value={row.parcelInfo.parcelLength + ' m'}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <TextField
                                    fullWidth
                                    helperText="You can not change this field"
                                    label="Parcel Width"
                                    name="parcelWidth"
                                    value={row.parcelInfo.parcelWidth + ' m'}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <TextField
                                    fullWidth
                                    helperText="You can not change this field"
                                    label="Parcel Height"
                                    name="parcelHeight"
                                    value={row.parcelInfo.parcelHeight + ' m'}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="You can not change this field"
                                    label="Parcel Weight"
                                    name="parcelWeight"
                                    value={row.parcelInfo.parcelWeight + ' kg'}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="You can not change this field"
                                    label="Parcel Volume"
                                    name="parcelVolume"
                                    value={row.parcelInfo.parcelVolume + ' m³'}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="h6"
                                sx={{pt: 3.5, pb: 3, px: 5}}>
                        Choose the Storage Shelf
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Grid
                            sx={{width: '92%'}}
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={!!(formik.touched.mainShelfSerialNumber && formik.errors.mainShelfSerialNumber)}
                                        id="mainShelfSerialNumber-label"
                                        required
                                        sx={{
                                            mt: '1px',
                                            '&.MuiInputLabel-shrink': {
                                                marginTop: '1rem',
                                            },
                                        }}
                                    >
                                        Select Main Shelf Serial Number
                                    </InputLabel>
                                    <Select
                                        error={!!(formik.touched.mainShelfSerialNumber && formik.errors.mainShelfSerialNumber)}
                                        value={formik.values.mainShelfSerialNumber}
                                        onChange={handleMainShelfSerialNumberChange}
                                        onBlur={formik.handleBlur}
                                        name="mainShelfSerialNumber"
                                        variant="outlined"
                                        labelId="mainShelfSerialNumber-label"
                                        sx={{
                                            height: '55px',
                                            '.MuiSelect-select': {
                                                paddingTop: '33px',
                                                textAlign: 'left',
                                            }
                                        }}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            },
                                            transformOrigin: {
                                                vertical: 'top',
                                                horizontal: 'left',
                                            },
                                            style: {marginTop: '5px', maxHeight: 400},
                                            PaperProps: {
                                                component: CustomScrollMenu,
                                            },
                                        }}
                                    >
                                        <MenuItem key={'mainShelfSerialNumber0'} value="">None</MenuItem>
                                        {mainShelfSerialNumbers.map((option) => (
                                            <MenuItem key={'mainShelfSerialNumber' + option.value}
                                                      value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText
                                        error>{formik.touched.mainShelfSerialNumber && formik.errors.mainShelfSerialNumber}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={!!(formik.touched.floorSerialNumber && formik.errors.floorSerialNumber)}
                                        id="floorSerialNumber-label"
                                        required
                                        sx={{
                                            mt: '1px',
                                            '&.MuiInputLabel-shrink': {
                                                marginTop: '1rem',
                                            },
                                        }}
                                    >
                                        Select Floor Serial Number
                                    </InputLabel>
                                    <Select
                                        error={!!(formik.touched.floorSerialNumber && formik.errors.floorSerialNumber)}
                                        value={formik.values.floorSerialNumber}
                                        onChange={handleFloorSerialNumberChange}
                                        onBlur={formik.handleBlur}
                                        name="floorSerialNumber"
                                        variant="outlined"
                                        labelId="floorSerialNumber-label"
                                        sx={{
                                            height: '55px',
                                            '.MuiSelect-select': {
                                                paddingTop: '33px',
                                                textAlign: 'left',
                                            }
                                        }}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            },
                                            transformOrigin: {
                                                vertical: 'top',
                                                horizontal: 'left',
                                            },
                                            style: {marginTop: '5px', maxHeight: 400},
                                            PaperProps: {
                                                component: CustomScrollMenu,
                                            },
                                        }}
                                    >
                                        {getFloorSerialNumbers(formik.values.mainShelfSerialNumber).map((option) => (
                                            <MenuItem key={'floorSerialNumber' + option.value}
                                                      value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText
                                        error>{formik.touched.floorSerialNumber && formik.errors.floorSerialNumber}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <FormControl fullWidth>
                                    <InputLabel
                                        error={!!(formik.touched.maxParcelsNumToStore && formik.errors.maxParcelsNumToStore)}
                                        id="maxParcelsNumToStore-label"
                                        required
                                        sx={{
                                            mt: '1px',
                                            '&.MuiInputLabel-shrink': {
                                                marginTop: '1rem',
                                            },
                                        }}
                                    >
                                        Maximum of Parcels To Store
                                    </InputLabel>
                                    <Select
                                        error={!!(formik.touched.maxParcelsNumToStore && formik.errors.maxParcelsNumToStore)}
                                        value={formik.values.maxParcelsNumToStore}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="maxParcelsNumToStore"
                                        variant="outlined"
                                        labelId="maxParcelsNumToStore-label"
                                        sx={{
                                            height: '55px',
                                            '.MuiSelect-select': {
                                                paddingTop: '33px',
                                                textAlign: 'left',
                                            }
                                        }}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            },
                                            transformOrigin: {
                                                vertical: 'top',
                                                horizontal: 'left',
                                            },
                                            style: {marginTop: '5px', maxHeight: 400},
                                            PaperProps: {
                                                component: CustomScrollMenu,
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            value={formik.values.maxParcelsNumToStore}>{formik.values.maxParcelsNumToStore}</MenuItem>
                                    </Select>
                                    <FormHelperText
                                        error>{formik.touched.maxParcelsNumToStore && formik.errors.maxParcelsNumToStore}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <DialogActions sx={{mb: 3, mt: 5}}>
                    <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                    >
                        <Button
                            type="submit"
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
                    </form>
                </DialogActions>
            </Dialog>
        </>
    );
};
