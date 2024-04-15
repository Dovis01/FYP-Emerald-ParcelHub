import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, Paper,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";
import {updateCourierPersonalInfo, updateRegisteredAccountInfo} from "@/api/springboot-api";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";

export const AccountProfileDetails = () => {
    const auth = useAuthContext();
    const nameList = auth.user?.fullName.split(' ');

    const formik = useFormik({
        initialValues: {
            firstName: nameList[0] || '',
            lastName: nameList[nameList.length - 1] || '',
            phoneNumber: auth.user?.phoneNumber || '',
            username: auth.user?.username || '',
            email: auth.user?.email || '',
            newPassword: '',
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            phoneNumber: Yup
                .string()
                .matches(/^\+353\s08\d{8}$/, 'Invalid mobile phone format. Expected format: +353 08XXXXXXXX'),
            username: Yup
                .string()
                .max(20, 'Username must be 20 characters or less')
                .matches(/^\S*$/, 'Username cannot contain spaces'),
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(25, 'Email address must be 25 characters or less'),
            newPassword: Yup
                .string()
                .max(25, 'Password must be 25 characters or less')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\^$*.\[\]{}()?"!@#%&/,><':;|_~`]/, 'Password must contain at least one special character') // 特殊字符集可能需要根据实际需求调整
                .matches(/^\S*$/, 'Password cannot contain spaces'),
            confirmPassword: Yup
                .string()
                .max(25, 'Confirm password must be 25 characters or less')
                .min(8, 'Confirm password must be at least 8 characters')
                .oneOf([Yup.ref('newPassword')], 'Passwords must match')
                .matches(/^\S*$/, 'Confirm password cannot contain spaces'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const [courierResult, accountResult] = await Promise.all([
                    updateCourierPersonalInfo(values, auth.user.courierId),
                    updateRegisteredAccountInfo(values, auth.user.accountId)
                ]);
                if (courierResult.success && accountResult.success) {
                    toast.success('Your account info updated successfully!');
                } else if(!courierResult.success) {
                    toast.error(courierResult.msg);
                } else if (!accountResult.success) {
                    toast.error(accountResult.msg);
                }else {
                    toast.error('Ooops! Failed to update account info.');
                }
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <form
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Paper elevation={10} sx={{width: '195%', height: '100%', ml: 20.4}}>
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                        sx={{ml: 4, mt: 2.5}}
                    />
                    <CardContent sx={{pt: 0, ml: 4, mr: 3.5, mt: 1}}>
                        <Box sx={{m: -1.5}}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        helperText="Your first name cannot be changed."
                                        label="First name"
                                        name="firstName"
                                        value={formik.values.firstName}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        helperText="Your last name cannot be changed."
                                        label="Last name"
                                        name="lastName"
                                        value={formik.values.lastName}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                >
                                    <TextField
                                        error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                        fullWidth
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        label="PhoneNumber"
                                        name="phoneNumber"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                        autoComplete="phoneNumber"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                sx={{mt: 1.5}}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        error={!!(formik.touched.username && formik.errors.username)}
                                        fullWidth
                                        helperText={formik.touched.username && formik.errors.username}
                                        label="User Name"
                                        name="username"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email Address"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <CardHeader
                                    subheader="You can change your password"
                                    title="Account Password"
                                    sx={{mt:-2}}
                                />
                                <Grid
                                    xs={12}
                                    md={12}
                                >
                                    <TextField
                                        error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                                        fullWidth
                                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                                        label="NewPassword"
                                        name="newPassword"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.newPassword}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={12}
                                >
                                    <TextField
                                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                        fullWidth
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        label="ConfirmPassword"
                                        name="confirmPassword"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.confirmPassword}
                                        autoComplete="confirm-password"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" type="submit" sx={{mr: 3.5, mb: 4}}>
                            Save details
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </form>
    );
};
