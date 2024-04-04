import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    FormControl, FormControlLabel, FormHelperText,
    FormLabel, Grid, InputLabel,
    Link,
    Radio,
    RadioGroup, Select,
    Stack,
    TextField,
    Typography, useRadioGroup
} from '@mui/material';
import {AuthLayout} from '@/components/layouts/authLayout';
import {useAuthContext} from "@/contexts/auth-context";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import MenuItem from "@mui/material/MenuItem";


const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({theme, checked}) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

const workType = ["Deliver Parcels", "Collect Parcels"];

const SignUpPage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const [roleType, setRoleType] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            employeeCode: '',
            workType: '',
            firstName: '',
            middleName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(20, 'Username must be 20 characters or less')
                .matches(/^\S*$/, 'Username cannot contain spaces')
                .required('User name is required'),
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(25, 'Email address must be 25 characters or less')
                .required('Email is required'),
            employeeCode: roleType === 'Courier' || roleType === 'ParcelStationManager' ? Yup
                .string()
                .max(24, 'Employee code must be 24 characters or less')
                .matches(/^\S*$/, 'Employee code cannot contain spaces')
                .required('The employee code is required')
                .matches(
                    /^[A-Z]{2}-\d{8}\d{6}-[A-Z0-9]{6}$/,
                    'Employee code must match the pattern XX-YYYYMMDDHHMMSS-XXXXX(UpperCase)'
                ) : Yup.string(),
            workType: roleType === 'Courier' ? Yup
                .string()
                .required('Work type is required') : Yup.string(),
            firstName: roleType === 'Customer' ? Yup
                    .string()
                    .max(12, 'First name must be 12 characters or less')
                    .matches(/^\S*$/, 'First name cannot contain spaces')
                    .required('First name is required')
                : Yup.string(),
            middleName: roleType === 'Customer' ? Yup
                    .string()
                    .max(12, 'Middle name must be 12 characters or less')
                    .matches(/^\S*$/, 'Middle name cannot contain spaces')
                : Yup.string(),
            lastName: roleType === 'Customer' ? Yup
                    .string()
                    .max(12, 'Last name must be 12 characters or less')
                    .matches(/^\S*$/, 'Last name cannot contain spaces')
                    .required('Last name is required')
                : Yup.string(),
            password: Yup
                .string()
                .max(25, 'Password must be 25 characters or less')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\^$*.\[\]{}()?"!@#%&/,><':;|_~`]/, 'Password must contain at least one special character') // 特殊字符集可能需要根据实际需求调整
                .matches(/^\S*$/, 'Password cannot contain spaces')
                .required('Password is required'),
            confirmPassword: Yup
                .string()
                .max(25, 'Confirm password must be 25 characters or less')
                .min(8, 'Confirm password must be at least 8 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .matches(/^\S*$/, 'Confirm password cannot contain spaces')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values, helpers) => {
            if (!roleType) {
                toast.error('Sorry, you must choose your role type!');
                return;
            }
            try {
                const registrationData = {
                    roleType: roleType,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    employeeCode: values.employeeCode,
                    workType: values.workType,
                    firstName: values.firstName,
                    middleName: values.middleName,
                    lastName: values.lastName
                };
                await auth.signUp(registrationData);
                toast.success('Sign Up successfully.  Welcome to Emerald-Parcel Hub!');
                router.push('/');
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
                toast.error("Ooops! " + err.message);
            }
        }
    });

    const MyFormControlLabel = (props) => {
        const radioGroup = useRadioGroup();
        useEffect(() => {
            if (radioGroup) {
                setRoleType(radioGroup.value || '');
            }
        }, [radioGroup]);
        const checked = radioGroup ? radioGroup.value === props.value : false;
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    return (
        <>
            <Head>
                <title>
                    Sign Up | Emerald-Parcel Hub
                </title>
            </Head>
            <Box
                sx={{
                    background: 'linear-gradient(169deg, rgba(246,246,246,0.9725140056022409) 67%, rgba(173,230,232,0.64) 100%)',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        mt: -10,
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{mb: 3}}
                        >
                            <Typography variant="h4">
                                Sign Up
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Already have an account?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/signIn"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Sign In
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={2}>
                                <TextField
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="User Name"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    autoComplete="sign-up-username"
                                />
                                <TextField
                                    style={{marginBottom: -3}}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email Address"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
                                    autoComplete="sign-up-email"
                                />
                                <FormControl
                                    sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', width: 580}}>
                                    <FormLabel id="role-row-radio-group"
                                               sx={{ml: 1, mt: -0.2, marginRight: 1.6, fontSize: '18.1px'}}>Role
                                        :</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="role-row-radio-group"
                                        name="role-radio-group"
                                    >
                                        <MyFormControlLabel value="Customer" control={<Radio/>} label="Customer"/>
                                        <MyFormControlLabel value="Courier" control={<Radio/>} label="Courier"/>
                                        <MyFormControlLabel value="ParcelStationManager" control={<Radio/>}
                                                            label="Parcel Station Manager"/>
                                    </RadioGroup>
                                </FormControl>
                                {(roleType === 'Courier' || roleType === 'ParcelStationManager') && (
                                    <TextField
                                        style={{marginTop: 12}}
                                        error={!!(formik.touched.employeeCode && formik.errors.employeeCode)}
                                        fullWidth
                                        helperText={formik.touched.employeeCode && formik.errors.employeeCode}
                                        label="Employee Code"
                                        name="employeeCode"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.employeeCode}
                                    />
                                )}
                                {(roleType === 'Courier') && (
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                    }}>
                                        <FormControl style={{width: '100%',marginTop:'-9px'}}>
                                            <InputLabel
                                                id="WorkType"
                                                required
                                                sx={{
                                                    mt: 1,
                                                    '&.MuiInputLabel-shrink': {
                                                        marginTop: '1.48rem',
                                                    },
                                                    ...(formik.touched.workType && formik.errors.workType ? { color: 'red' } : {})
                                                }}
                                            >
                                                Select Work Type
                                            </InputLabel>
                                            <Select
                                                fullWidth
                                                variant="outlined"
                                                labelId="WorkType"
                                                value={formik.values.workType}
                                                name="workType"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={!!(formik.touched.workType && formik.errors.workType)}
                                                sx={{
                                                    height: '55px',
                                                    '.MuiSelect-select': {
                                                        paddingTop: '33px',
                                                        textAlign: 'left',
                                                    },
                                                    marginTop: '8px',
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
                                                    getContentAnchorEl: null,
                                                    style: {marginTop: '1px', maxHeight: 420},
                                                }}
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {workType.map((type) => (
                                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.workType && formik.errors.workType && (
                                                <FormHelperText style={{ color: 'red' }}>{formik.errors.workType}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                )}
                                {roleType === 'Customer' && (
                                    <Grid container spacing={1.5} style={{marginLeft: -12, marginTop: 0}}>
                                        <Grid item xs={4}>
                                            <TextField
                                                error={!!(formik.touched.firstName && formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                                label="First Name"
                                                name="firstName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="text"
                                                value={formik.values.firstName} // Change to the correct value reference
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                error={!!(formik.touched.middleName && formik.errors.middleName)}
                                                helperText={formik.touched.middleName && formik.errors.middleName}
                                                label="Middle Name"
                                                name="middleName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="text"
                                                value={formik.values.middleName} // Change to the correct value reference
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                error={!!(formik.touched.lastName && formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                                label="Last Name"
                                                name="lastName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                type="text"
                                                value={formik.values.lastName} // Change to the correct value reference
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                    autoComplete="new-password"
                                />
                                <TextField
                                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                    fullWidth
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    autoComplete="confirm-password"
                                />
                            </Stack>
                            <Button
                                fullWidth
                                size="large"
                                sx={{mt: 3}}
                                type="submit"
                                variant="contained"
                            >
                                Continue
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

SignUpPage.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default SignUpPage;
