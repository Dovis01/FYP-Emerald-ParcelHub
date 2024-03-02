import MainPageLayout from "@/components/layouts/mainPageLayout";
import ECommerceOrderOverviewPage from "@/pages/admin/e-commerce-order/overview";
import CustomerOverviewPage from "@/pages/customer/overview";
import CourierOverviewPage from "@/pages/courier/overview";
import StationManagerOverviewPage from "@/pages/stationManager/overview";
import {useAuthContext} from "@/contexts/auth-context";

const getComponentForRole = (roleType) => {
    switch (roleType) {
        case 'Admin':
            return <ECommerceOrderOverviewPage />;
        case 'Courier':
            return <CourierOverviewPage />;
        case 'Customer':
            return <CustomerOverviewPage />;
        case 'StationManager':
            return <StationManagerOverviewPage />;
        default:
            return <CustomerOverviewPage />;
    }
};

const HomeOverviewPage = () => {
    const authContext = useAuthContext();
    return getComponentForRole(authContext.user.roleType);
};

HomeOverviewPage.getLayout = (page) => (
    <MainPageLayout>
        {page}
    </MainPageLayout>
);
export default HomeOverviewPage;
