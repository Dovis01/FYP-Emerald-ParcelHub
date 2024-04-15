import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useAuthContext} from '@/contexts/auth-context';

const AuthGuard = (props) => {
    const {children} = props;
    const router = useRouter();
    const ignore = useRef(false);
    const [checked, setChecked] = useState(false);
    const {isAuthenticated} = useAuthContext();
    // Only do authentication check on component mount.
    // This flow allows you to manually redirect the user after sign-out, otherwise this will be
    // triggered and will automatically redirect to sign-in page.

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            // Prevent from calling twice in development mode with React.StrictMode enabled
            if (ignore.current) {
                return;
            }

            ignore.current = true;
            const isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
            const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
            const excludedPaths = ['/', '/admin/e-commerce-order/overview', '/courier/overview', '/customer/overview', '/station-manager/overview'];
            const authorizedPaths = ['/', '/auth/signIn', '/auth/signUp'];
            const shouldIncludeContinueUrl = !excludedPaths.includes(router.asPath);
            if (!isAuthenticated) {
                console.log('Not authenticated, redirecting');
                router
                    .replace({
                        pathname: '/auth/signIn',
                        query: shouldIncludeContinueUrl ? {continueUrl: router.asPath} : undefined
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else if (router.asPath.split('/')[1] !== userInfo.roleType.toLowerCase() && !authorizedPaths.includes(router.asPath)) {
                router.push('/401').catch((error) => {
                    console.error(error);
                });
            } else {
                setChecked(true);
            }
        },
        [router.isReady, isAuthenticated, router]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export const withAuthGuard = (Component) => (props) => (
    <AuthGuard>
        <Component {...props} />
    </AuthGuard>
);
