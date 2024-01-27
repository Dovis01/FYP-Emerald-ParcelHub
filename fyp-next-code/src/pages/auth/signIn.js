import {useCallback, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Alert,
    Box,
    Button,
    FormHelperText,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import { AuthLayout } from '@/components/layouts/authLayout';
import {useAuthContext} from "@/contexts/auth-context";

const SignInPage = () => {
    const router = useRouter();
    const auth = useAuthContext();
    const continueUrl = router.query.continueUrl || '/';
    const [method, setMethod] = useState('username');

    const formikUsername = useFormik({
        initialValues: {
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(64)
                .required('Username is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signInByUsername(values.username, values.password);
                await router.push(continueUrl);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
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
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signInByEmail(values.email, values.password);
                await router.push(continueUrl);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    const handleMethodChange = useCallback(
        (event, value) => {
            setMethod(value);
        },
        []
    );

    const handleSkip = useCallback(
        () => {
            auth.skip();
            router.push('/');
        },
        [auth, router]
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
                        mt:-12,
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
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
                        <Tabs
                            onChange={handleMethodChange}
                            sx={{ mb: 3 }}
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
                                    />
                                </Stack>
                                <FormHelperText sx={{ mt: 1 }}>
                                    Optionally you can skip.
                                </FormHelperText>
                                {formikUsername.errors.submit && (
                                    <Typography
                                        color="error"
                                        sx={{ mt: 3 }}
                                        variant="body2"
                                    >
                                        {formikUsername.errors.submit}
                                    </Typography>
                                )}
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 1 }}
                                    onClick={handleSkip}
                                >
                                    Skip authentication
                                </Button>
                                <Alert
                                    color="primary"
                                    severity="info"
                                    sx={{mt:-0.6,width: '100%' , display: 'flex', justifyContent: 'center',backgroundColor: 'transparent'}}
                                >
                                    <div>
                                        You can use <b>admin</b> and password <b>zsj123456</b>
                                    </div>
                                </Alert>
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
                                    />
                                </Stack>
                                <FormHelperText sx={{ mt: 1 }}>
                                    Optionally you can skip.
                                </FormHelperText>
                                {formikEmail.errors.submit && (
                                    <Typography
                                        color="error"
                                        sx={{ mt: 3 }}
                                        variant="body2"
                                    >
                                        {formikEmail.errors.submit}
                                    </Typography>
                                )}
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Continue
                                </Button>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 1 }}
                                    onClick={handleSkip}
                                >
                                    Skip authentication
                                </Button>
                                <Alert
                                    color="primary"
                                    severity="info"
                                    sx={{mt:-0.6,width: '101%', display: 'flex', justifyContent: 'center' ,backgroundColor: 'transparent'}}
                                >
                                    <div>
                                        You can use <b>20104636@mail.wit.ie</b> and password <b>Password123!</b>
                                    </div>
                                </Alert>
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
