import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button, FormControl, FormControlLabel,
    FormLabel,
    Link, Radio, RadioGroup,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography, useRadioGroup
} from '@mui/material';
import {AuthLayout} from '@/components/layouts/authLayout';
import {useAuthContext} from "@/contexts/auth-context";
import {styled} from "@mui/system";
import {toast} from "react-toastify";


const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({theme, checked}) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

const SignInPage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const continueUrl = router.query.continueUrl || '/';
    const [method, setMethod] = useState('username');
    const [roleType, setRoleType] = useState('');

    const formikUsername = useFormik({
        initialValues: {
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(20, 'Username must be 20 characters or less')
                .matches(/^\S*$/, 'Username cannot contain spaces')
                .required('Username is required'),
            password: Yup
                .string()
                .max(25, 'Password must be 25 characters or less')
                .matches(/^\S*$/, 'Password cannot contain spaces')
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            if (!roleType) {
                toast.error('Sorry, you must choose your role type!');
                return;
            }
            try {
                await auth.signInByUsername(values.username, values.password, roleType);
                toast.success('Sign In by username successfully.  Welcome, ' + values.username + '!');
                await router.push(continueUrl);
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
                toast.error("Ooops! " + err.message);
            }
        }
    });

    const formikEmail = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(25, 'Email address must be 25 characters or less')
                .required('Email is required'),
            password: Yup
                .string()
                .max(25, 'Password must be 25 characters or less')
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            if (!roleType) {
                toast.error('Sorry, you must choose your role type!');
                return;
            }
            try {
                await auth.signInByEmail(values.email, values.password, roleType);
                toast.success('Sign In by email successfully.  Welcome, ' + values.email + '!');
                await router.push(continueUrl);
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
                toast.error("Ooops! " + err.message);
            }
        }
    });

    const formikAdmin = useFormik({
        initialValues: {
            adminName: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            adminName: Yup
                .string()
                .max(20, 'Admin name must be 20 characters or less')
                .required('Admin name is required'),
            password: Yup
                .string()
                .max(25, 'Admin password must be 25 characters or less')
                .required('Admin password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signInByUsername(values.adminName, values.password, "Admin");
                toast.success('Sign In as admin account successfully.  Welcome, ' + values.adminName + '!');
                await router.push(continueUrl);
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
        return <StyledFormControlLabel checked={checked} {...props}/>;
    }

    const handleMethodChange = useCallback(
        (event, value) => {
            setMethod(value);
        },
        []
    );

    return (
        <>
            <Head>
                <title>
                    Sign In | Emerald-Parcel Hub
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
                        mt: -4,
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
                                Sign In
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Don&apos;t have an account?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/signUp"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Stack>
                        <FormControl
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 580,
                                mt: -1,
                                mb: 0
                            }}>
                            <FormLabel id="role-row-radio-group"
                                       sx={{mt: -0.2, marginRight: 1.6, fontSize: '18.1px'}}>Role :</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="role-row-radio-group"
                                name="role-radio-group"
                            >
                                <MyFormControlLabel value="Customer" control={<Radio/>} label="Customer"
                                                    disabled={method === 'admin'}/>
                                <MyFormControlLabel value="Courier" control={<Radio/>} label="Courier"
                                                    disabled={method === 'admin'}/>
                                <MyFormControlLabel value="Station-Manager" control={<Radio/>}
                                                    label="Parcel Station Manager" disabled={method === 'admin'}/>
                            </RadioGroup>
                        </FormControl>
                        <Tabs
                            onChange={handleMethodChange}
                            sx={{mb: 3}}
                            value={method}
                        >
                            <Tab
                                label="User Name"
                                value="username"
                            />
                            <Tab
                                label="Email"
                                value="email"
                            />
                            <Tab
                                label="Admin"
                                value="admin"
                            />
                        </Tabs>
                        {method === 'username' && (
                            <form
                                noValidate
                                onSubmit={formikUsername.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formikUsername.touched.username && formikUsername.errors.username)}
                                        fullWidth
                                        helperText={formikUsername.touched.username && formikUsername.errors.username}
                                        label="User Name"
                                        name="username"
                                        onBlur={formikUsername.handleBlur}
                                        onChange={formikUsername.handleChange}
                                        value={formikUsername.values.username}
                                        autoComplete="username"
                                    />
                                    <TextField
                                        error={!!(formikUsername.touched.password && formikUsername.errors.password)}
                                        fullWidth
                                        helperText={formikUsername.touched.password && formikUsername.errors.password}
                                        label="Password"
                                        name="password"
                                        onBlur={formikUsername.handleBlur}
                                        onChange={formikUsername.handleChange}
                                        type="password"
                                        value={formikUsername.values.password}
                                        autoComplete="usernamepassword"
                                    />
                                </Stack>
                                <Box sx={{mt: 2,ml:0.4}}>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Forgot your password?
                                        &nbsp;
                                        <Link
                                            component={NextLink}
                                            href="/auth/forgetPassword"
                                            underline="hover"
                                            variant="subtitle2"
                                        >
                                            Find back
                                        </Link>
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{mt: 2.5}}
                                    type="submit"
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                            </form>
                        )}
                        {method === 'email' && (
                            <form
                                noValidate
                                onSubmit={formikEmail.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formikEmail.touched.email && formikEmail.errors.email)}
                                        fullWidth
                                        helperText={formikEmail.touched.email && formikEmail.errors.email}
                                        label="Email Address"
                                        name="email"
                                        onBlur={formikEmail.handleBlur}
                                        onChange={formikEmail.handleChange}
                                        type="email"
                                        value={formikEmail.values.email}
                                        autoComplete="email"
                                    />
                                    <TextField
                                        error={!!(formikEmail.touched.password && formikEmail.errors.password)}
                                        fullWidth
                                        helperText={formikEmail.touched.password && formikEmail.errors.password}
                                        label="Password"
                                        name="password"
                                        onBlur={formikEmail.handleBlur}
                                        onChange={formikEmail.handleChange}
                                        type="password"
                                        value={formikEmail.values.password}
                                        autoComplete="emailpassword"
                                    />
                                </Stack>
                                <Box sx={{mt: 2,ml:0.4}}>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Forgot your password?
                                        &nbsp;
                                        <Link
                                            component={NextLink}
                                            href="/auth/forgetPassword"
                                            underline="hover"
                                            variant="subtitle2"
                                        >
                                            Find back
                                        </Link>
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{mt: 2.5}}
                                    type="submit"
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                            </form>
                        )}
                        {method === 'admin' && (
                            <form
                                noValidate
                                onSubmit={formikAdmin.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formikAdmin.touched.adminName && formikAdmin.errors.adminName)}
                                        fullWidth
                                        helperText={formikAdmin.touched.adminName && formikAdmin.errors.adminName}
                                        label="Admin Name"
                                        name="adminName"
                                        onBlur={formikAdmin.handleBlur}
                                        onChange={formikAdmin.handleChange}
                                        value={formikAdmin.values.adminName}
                                        autoComplete="adminName"
                                    />
                                    <TextField
                                        error={!!(formikAdmin.touched.password && formikAdmin.errors.password)}
                                        fullWidth
                                        helperText={formikAdmin.touched.password && formikAdmin.errors.password}
                                        label="Password"
                                        name="password"
                                        onBlur={formikAdmin.handleBlur}
                                        onChange={formikAdmin.handleChange}
                                        type="password"
                                        value={formikAdmin.values.password}
                                        autoComplete="adminPassword"
                                    />
                                </Stack>
                                <Box sx={{mt: 2,ml:0.4}}>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Forgot your password?
                                        &nbsp;
                                        <Link
                                            component={NextLink}
                                            href="/auth/forgetPassword"
                                            underline="hover"
                                            variant="subtitle2"
                                        >
                                            Find back
                                        </Link>
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{mt: 2.5}}
                                    type="submit"
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                            </form>
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );
};

SignInPage.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default SignInPage;
