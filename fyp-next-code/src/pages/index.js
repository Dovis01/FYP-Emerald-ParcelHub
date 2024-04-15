import MainPageLayout from "@/components/layouts/mainPageLayout";
import {useAuthContext} from "@/contexts/auth-context";
import {useRouter} from "next/router";

const getComponentForRole = (roleType) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    switch (roleType) {
        case 'Admin':
            router.push('/admin/e-commerce-order/overview');
            break;
        case 'Courier':
            router.push('/courier/overview');
            break;
        case 'Customer':
            router.push('/customer/overview');
            break;
        case 'Station-Manager':
            router.push('/station-manager/overview');
            break;
    }
};

const DefaultOverviewPage = () => {
    const authContext = useAuthContext();
    return getComponentForRole(authContext.user.roleType);
};

DefaultOverviewPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);
export default DefaultOverviewPage;
