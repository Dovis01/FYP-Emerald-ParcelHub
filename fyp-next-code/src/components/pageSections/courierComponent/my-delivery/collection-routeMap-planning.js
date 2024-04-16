import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    Marker,
    useJsApiLoader
} from '@react-google-maps/api';
import {Box} from "@mui/material";
import {customAlphabet} from 'nanoid';
import React, {useEffect, useRef, useState} from "react";
import {
    transferCourierCollectionRouteAddressToLatAndLng,
} from "@/api/springboot-api";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import {RenderMarkerForCourier} from "@/components/customized/googleMap/markerRendererForCourier";
import {useAuthContext} from "@/contexts/auth-context";
import randomColor from "randomcolor";


const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);

export const CollectionRouteMapPlanning = () => {
    const [routeAllAddressesInfo, setRouteAllAddressesInfo] = useState([]);
    const [uniqueMarkers, setUniqueMarkers] = useState([]);
    const [directionsResponses, setDirectionsResponses] = useState({});
    const googleMap = useGoogleMapContext();
    const auth = useAuthContext();
    const mapRef = useRef(null);

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: 'en',
        region: 'IE',
    });

    const containerStyle = {
        width: '172.1vh',
        height: '70vh'
    };

    const center = {
        lat: 52.24644088745117,
        lng: -7.138790130615234
    };

    const options = {
        language: 'en',
        region: 'IE',
    };

    useEffect(() => {
        if (isLoaded) {
            const fetchRouteAddressesLocation = async () => {
                const response = await transferCourierCollectionRouteAddressToLatAndLng(googleMap.courierCollectionRouteAddresses);
                if (response.success) {
                    response.data.uniqueId = nanoid();
                    setRouteAllAddressesInfo(() => response.data);
                } else {
                    console.error("Failed to fetch route addresses location data");
                }
            };

            fetchRouteAddressesLocation();
        }
    }, [googleMap.courierCollectionRouteAddresses, isLoaded]);

    useEffect(() => {
        const uniqueMarkers = Array.from(new Set(routeAllAddressesInfo));
        const defaultCOLAddressObj = routeAllAddressesInfo.find(addressInfo => addressInfo.addressGeoInfo.addressType === 'COL-Parcel Hub');

        googleMap.updateCourierCurrentCollectionAddr(defaultCOLAddressObj);
        setUniqueMarkers(uniqueMarkers);
    }, [routeAllAddressesInfo]);

    useEffect(() => {
        const map = mapRef.current;
        if (map && uniqueMarkers.length) {
            const bounds = new google.maps.LatLngBounds();
            uniqueMarkers.forEach(marker => {
                const position = new google.maps.LatLng(marker.addressGeoInfo.latitude, marker.addressGeoInfo.longitude);
                bounds.extend(position);
            });
            map.fitBounds(bounds);
        }
    }, [uniqueMarkers]);

    const getRouteOptions = (routeAllAddressesInfo) => {
        const waypointRecords = routeAllAddressesInfo.filter(addressInfo => addressInfo.addressGeoInfo.addressType === 'ORG-Shipper');
        const origin = routeAllAddressesInfo.find(addressInfo => addressInfo.addressGeoInfo.addressType === 'COL-Parcel Hub');
        const destination = routeAllAddressesInfo.find(addressInfo => addressInfo.addressGeoInfo.addressType === 'COL-Parcel Hub');

        const waypoints = waypointRecords.map(waypoint => ({
            location: {lat: waypoint.addressGeoInfo.latitude, lng: waypoint.addressGeoInfo.longitude},
            stopover: true
        }));

        return {
            origin: {lat: origin.addressGeoInfo.latitude, lng: origin.addressGeoInfo.longitude},
            destination: {lat: destination.addressGeoInfo.latitude, lng: destination.addressGeoInfo.longitude},
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        };
    };

    const directionsCallback = (routeAllAddressesInfo, res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                googleMap.updateCourierCollectionOverviewPaths(res.routes[0].overview_path);
                setDirectionsResponses(prev => ({...prev, [routeAllAddressesInfo.uniqueId]: res}));
            } else {
                console.error(`error fetching directions for order ${routeAllAddressesInfo.uniqueId}: `, res);
            }
        }
    };

    if (loadError) {
        console.error("Google Maps API failed to load: ", loadError);
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const RenderMarkerTruckIcon = ({routeDirectionRes, currentAddrObj}) => {
        const currentAddrFullObj = routeAllAddressesInfo.find(addressInfo => addressInfo.addressGeoInfo.address === currentAddrObj.addressGeoInfo.address);
        const currentAddrFullInfo = currentAddrFullObj !== undefined ? currentAddrFullObj : currentAddrObj;
        if (routeDirectionRes) {
            const titleInfo = 'Courier name: ' + auth.currentUsername;
            return <Marker
                position={{
                    lat: currentAddrFullInfo.addressGeoInfo.latitude,
                    lng: currentAddrFullInfo.addressGeoInfo.longitude
                }}
                icon={{
                    url: '/assets/icons/googleMap/Truck.png',
                    scaledSize: new window.google.maps.Size(64, 64),
                    anchor: new window.google.maps.Point(32, 50)
                }}
                title={titleInfo}
            />;
        }
        return null;
    };

    const renderDirections = (routeAllAddressesInfo) => {
        const directionsResponse = directionsResponses[routeAllAddressesInfo.uniqueId];

        if (directionsResponse) {
            const renderers = directionsResponse.routes[0].legs.map((leg, index) => {
                const legColor = randomColor({
                    luminosity: 'bright',
                    hue: 'red',
                    format: 'hsla',
                    alpha: 0.9
                });
                const legDirections = {
                    ...directionsResponse,
                    routes: [{...directionsResponse.routes[0], legs: [leg]}],
                };

                return (
                    <DirectionsRenderer
                        key={`leg${routeAllAddressesInfo.uniqueId}-${index}`}
                        options={{
                            directions: legDirections,
                            suppressMarkers: true,
                            polylineOptions: {
                                strokeColor: legColor,
                                strokeOpacity: 0.88,
                                strokeWeight: 6.5,
                            },
                        }}
                    />
                );
            });

            return (
                <React.Fragment key={`fragment${routeAllAddressesInfo.uniqueId}`}>
                    {renderers}
                    <RenderMarkerTruckIcon key={`truck${routeAllAddressesInfo.uniqueId}`}
                                           routeDirectionRes={directionsResponses[routeAllAddressesInfo.uniqueId].routes[0].overview_path}
                                           currentAddrObj={googleMap.courierCurrentCollectionAddr}
                    />
                </React.Fragment>
            );
        }

        const routeOptions = getRouteOptions(routeAllAddressesInfo);
        return (
            <DirectionsService
                key={routeAllAddressesInfo.uniqueId}
                options={routeOptions}
                callback={(res) => directionsCallback(routeAllAddressesInfo, res)}
            />
        );
    };

    const icon = {
        url: '/assets/icons/googleMap/MarkLabel.png',
        scaledSize: new window.google.maps.Size(140, 140),
        labelOrigin: new window.google.maps.Point(86, 69),
        anchor: new window.google.maps.Point(70, 105)
    };

    return (
        <Box>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={options}
                onLoad={map => mapRef.current = map}
            >
                {routeAllAddressesInfo.length >= 2 ? renderDirections(routeAllAddressesInfo) : null}
                {uniqueMarkers.length > 0 ? (
                    uniqueMarkers.map((marker, index) => (
                        <RenderMarkerForCourier key={index} marker={marker}/>
                    ))
                ) : (
                    <Marker
                        position={center}
                        label={{text: 'Home'}}
                        icon={icon}
                    />
                )}
            </GoogleMap>
        </Box>
    );
}


