import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";

export const GoogleMapContext = createContext({undefined});

export const GoogleMapContextProvider = (props) => {
    const [customerTrackingRouteAddresses, setCustomerTrackingRouteAddresses] = useState([]);
    const [courierCollectionRouteAddresses, setCourierCollectionRouteAddresses] = useState([]);
    const [courierDeliveryRouteAddresses, setCourierDeliveryRouteAddresses] = useState([]);
    const [stationDeliveringParcelsRouteAddresses, setStationDeliveringParcelsRouteAddresses] = useState([]);
    const [customerStationAddresses, setCustomerStationAddresses] = useState([]);
    const [courierCollectionOverviewPaths, setCourierCollectionOverviewPaths] = useState([]);
    const [courierDeliveryOverviewPaths, setCourierDeliveryOverviewPaths] = useState([]);
    const [courierCurrentCollectionAddr, setCourierCurrentCollectionAddr] = useState();
    const [courierCurrentDeliveryAddr, setCourierCurrentDeliveryAddr] = useState();
    const [stationDeliverySelectedParcelTrackingCodes, setStationDeliverySelectedParcelTrackingCodes] = useState([]);

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

    const updateStationDeliveringParcelsRouteAddresses = (newAddress) => {
        setStationDeliveringParcelsRouteAddresses((prevAddresses) => {
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

    const updateStationDeliverySelectedParcelTrackingCodes = (trackingCodes) => {
        setStationDeliverySelectedParcelTrackingCodes(() => trackingCodes);
    }

    return (
        <GoogleMapContext.Provider value={{
            customerTrackingRouteAddresses,
            courierCollectionRouteAddresses,
            courierDeliveryRouteAddresses,
            stationDeliveringParcelsRouteAddresses,
            customerStationAddresses,
            courierCurrentCollectionAddr,
            courierCurrentDeliveryAddr,
            courierCollectionOverviewPaths,
            courierDeliveryOverviewPaths,
            stationDeliverySelectedParcelTrackingCodes,
            updateCustomerTrackingRouteAddresses,
            updateCustomerStationAddresses,
            updateCourierCollectionRouteAddresses,
            updateCourierDeliveryRouteAddresses,
            updateStationDeliveringParcelsRouteAddresses,
            updateCourierCurrentCollectionAddr,
            updateCourierCurrentDeliveryAddr,
            updateCourierCollectionOverviewPaths,
            updateCourierDeliveryOverviewPaths,
            updateStationDeliverySelectedParcelTrackingCodes
        }}>
            {props.children}
        </GoogleMapContext.Provider>
    );
}

GoogleMapContextProvider.propTypes = {
    children: PropTypes.node
};

export const useGoogleMapContext = () => useContext(GoogleMapContext);
