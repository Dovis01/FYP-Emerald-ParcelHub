import {useCallback, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import {AuthLayout} from '@/components/layouts/authLayout';
import {useAuthContext} from "@/contexts/auth-context";
import {toast} from "react-toastify";


const ForgetPasswordPage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const [method, setMethod] = useState('username');

    const formikUsername = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
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
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\^$*.\[\]{}()?"!@#%&/,><':;|_~`]/, 'Password must contain at least one special character') // 特殊字符集可能需要根据实际需求调整
                .matches(/^\S*$/, 'Password cannot contain spaces')
                .required('New password is required'),
            confirmPassword: Yup
                .string()
                .max(25, 'Confirm password must be 25 characters or less')
                .min(8, 'Confirm password must be at least 8 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .matches(/^\S*$/, 'Confirm password cannot contain spaces')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const requestBody = {
                    username: values.username,
                    newPassword: values.password
                }
                await auth.resetPass(requestBody);
                toast.success('Reset password successfully.  Welcome, ' + values.username + '!');
                await router.push('/auth/signIn');
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
            confirmPassword: '',
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
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\^$*.\[\]{}()?"!@#%&/,><':;|_~`]/, 'Password must contain at least one special character') // 特殊字符集可能需要根据实际需求调整
                .matches(/^\S*$/, 'Password cannot contain spaces')
                .required('New password is required'),
            confirmPassword: Yup
                .string()
                .max(25, 'Confirm password must be 25 characters or less')
                .min(8, 'Confirm password must be at least 8 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .matches(/^\S*$/, 'Confirm password cannot contain spaces')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const requestBody = {
                    email: values.email,
                    newPassword: values.password
                }
                await auth.resetPass(requestBody);
                toast.success('Reset password successfully.  Welcome, ' + values.email + '!');
                await router.push('/auth/signIn');
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
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            adminName: Yup
                .string()
                .max(20, 'Admin name must be 20 characters or less')
                .required('Admin name is required'),
            password: Yup
                .string()
                .max(25, 'Password must be 25 characters or less')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\^$*.\[\]{}()?"!@#%&/,><':;|_~`]/, 'Password must contain at least one special character') // 特殊字符集可能需要根据实际需求调整
                .matches(/^\S*$/, 'Password cannot contain spaces')
                .required('New password is required'),
            confirmPassword: Yup
                .string()
                .max(25, 'Confirm password must be 25 characters or less')
                .min(8, 'Confirm password must be at least 8 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .matches(/^\S*$/, 'Confirm password cannot contain spaces')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                const requestBody = {
                    adminName: values.adminName,
                    newPassword: values.password
                }
                await auth.resetPass(requestBody);
                toast.success('Reset password successfully.  Welcome, ' + values.adminName + '!');
                await router.push('/auth/signIn');
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
                toast.error("Ooops! " + err.message);
            }
        }
    });

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
                    Forger Password | Emerald-Parcel Hub
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
                                Forget Password
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Have finished reset your password?
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
                                        label="New Password"
                                        name="password"
                                        onBlur={formikUsername.handleBlur}
                                        onChange={formikUsername.handleChange}
                                        type="password"
                                        value={formikUsername.values.password}
                                        autoComplete="username-new-password"
                                    />
                                    <TextField
                                        error={!!(formikUsername.touched.confirmPassword && formikUsername.errors.confirmPassword)}
                                        fullWidth
                                        helperText={formikUsername.touched.confirmPassword && formikUsername.errors.confirmPassword}
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        onBlur={formikUsername.handleBlur}
                                        onChange={formikUsername.handleChange}
                                        type="password"
                                        value={formikUsername.values.confirmPassword}
                                        autoComplete="username-confirm-password"
                                    />
                                </Stack>
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
                                        label="New Password"
                                        name="password"
                                        onBlur={formikEmail.handleBlur}
                                        onChange={formikEmail.handleChange}
                                        type="password"
                                        value={formikEmail.values.password}
                                        autoComplete="email-new-password"
                                    />
                                    <TextField
                                        error={!!(formikEmail.touched.confirmPassword && formikEmail.errors.confirmPassword)}
                                        fullWidth
                                        helperText={formikEmail.touched.confirmPassword && formikEmail.errors.confirmPassword}
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        onBlur={formikEmail.handleBlur}
                                        onChange={formikEmail.handleChange}
                                        type="password"
                                        value={formikEmail.values.confirmPassword}
                                        autoComplete="email-confirm-password"
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
                                        label="New Password"
                                        name="password"
                                        onBlur={formikAdmin.handleBlur}
                                        onChange={formikAdmin.handleChange}
                                        type="password"
                                        value={formikAdmin.values.password}
                                        autoComplete="admin-new-password"
                                    />
                                    <TextField
                                        error={!!(formikAdmin.touched.confirmPassword && formikAdmin.errors.confirmPassword)}
                                        fullWidth
                                        helperText={formikAdmin.touched.confirmPassword && formikAdmin.errors.confirmPassword}
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        onBlur={formikAdmin.handleBlur}
                                        onChange={formikAdmin.handleChange}
                                        type="password"
                                        value={formikAdmin.values.confirmPassword}
                                        autoComplete="admin-confirm-password"
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
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );
};

ForgetPasswordPage.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default ForgetPasswordPage;
