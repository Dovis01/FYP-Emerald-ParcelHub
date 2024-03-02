import {useAuthContext} from "@/contexts/auth-context";
import {useEffect} from "react";
import {useRouter} from "next/router";


const DefaultOverviewPage = () => {
    const router = useRouter();
    const authContext = useAuthContext();

    useEffect(() => {
        const roleType = authContext.user?.roleType;

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
            case 'StationManager':
                router.push('/station-manager/overview');
                break;
            default:
                router.push('/customer/overview');
                break;
        }
    }, [authContext.user, router]);
};

export default DefaultOverviewPage;
