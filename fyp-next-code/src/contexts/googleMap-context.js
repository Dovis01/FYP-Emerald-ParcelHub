import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";

export const GoogleMapContext = createContext({undefined});

export const GoogleMapContextProvider = (props) => {
    const [customerTrackingRouteAddresses, setCustomerTrackingRouteAddresses] = useState([]);
    const [courierCollectionRouteAddresses, setCourierCollectionRouteAddresses] = useState([]);
    const [courierDeliveryRouteAddresses, setCourierDeliveryRouteAddresses] = useState([]);
    const [customerStationAddresses, setCustomerStationAddresses] = useState([]);
    const [courierCollectionOverviewPaths, setCourierCollectionOverviewPaths] = useState([]);
    const [courierDeliveryOverviewPaths, setCourierDeliveryOverviewPaths] = useState([]);
    const [courierCurrentCollectionAddr, setCourierCurrentCollectionAddr] = useState();
    const [courierCurrentDeliveryAddr, setCourierCurrentDeliveryAddr] = useState();

    const updateCustomerTrackingRouteAddresses = (newRouteAddresses) => {
        setCustomerTrackingRouteAddresses((prevRouteAddresses) => {
            const updatedRouteAddresses = [...prevRouteAddresses, newRouteAddresses];
            return [...updatedRouteAddresses];
        });
    };

    const updateCourierCollectionRouteAddresses = (newAddress) => {
        setCourierCollectionRouteAddresses((prevAddresses) => {
            const updatedAddresses = [...prevAddresses, newAddress];
            return [...updatedAddresses];
        });
    }

    const updateCourierDeliveryRouteAddresses = (newAddress) => {
        setCourierDeliveryRouteAddresses((prevAddresses) => {
            const updatedAddresses = [...prevAddresses, newAddress];
            return [...updatedAddresses];
        });
    }

    const updateCustomerStationAddresses = (newAddresses) => {
        setCustomerStationAddresses((prevAddr) => {
            const updatedAddr = new Set([...prevAddr, ...newAddresses])
            return [...updatedAddr];
        });
    }

    const updateCourierCurrentCollectionAddr = (newAddress) => {
        setCourierCurrentCollectionAddr(() => newAddress);
    }

    const updateCourierCollectionOverviewPaths = (overviewPaths) => {
        setCourierCollectionOverviewPaths(overviewPaths);
    }

    const updateCourierCurrentDeliveryAddr = (newAddress) => {
        setCourierCurrentDeliveryAddr(() => newAddress);
    }

    const updateCourierDeliveryOverviewPaths = (overviewPaths) => {
        setCourierDeliveryOverviewPaths(overviewPaths);
    }

    return (
        <GoogleMapContext.Provider value={{
            customerTrackingRouteAddresses,
            courierCollectionRouteAddresses,
            courierDeliveryRouteAddresses,
            customerStationAddresses,
            courierCurrentCollectionAddr,
            courierCurrentDeliveryAddr,
            courierCollectionOverviewPaths,
            courierDeliveryOverviewPaths,
            updateCustomerTrackingRouteAddresses,
            updateCustomerStationAddresses,
            updateCourierCollectionRouteAddresses,
            updateCourierDeliveryRouteAddresses,
            updateCourierCurrentCollectionAddr,
            updateCourierCurrentDeliveryAddr,
            updateCourierCollectionOverviewPaths,
            updateCourierDeliveryOverviewPaths,
        }}>
            {props.children}
        </GoogleMapContext.Provider>
    );
}

GoogleMapContextProvider.propTypes = {
    children: PropTypes.node
};

export const useGoogleMapContext = () => useContext(GoogleMapContext);
