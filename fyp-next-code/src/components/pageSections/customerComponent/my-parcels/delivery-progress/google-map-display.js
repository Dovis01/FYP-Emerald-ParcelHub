import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    Marker,
    useJsApiLoader
} from '@react-google-maps/api';
import {Box} from "@mui/material";
import randomColor from 'randomcolor';
import React, {useEffect, useRef, useState} from "react";
import {
    transferCusTrackParcelRouteAddressToLatAndLng,
} from "@/api/springboot-api";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import {RenderMarker} from "@/components/customized/googleMap/markerRenderer";

export const GoogleMapDisplay = () => {
    const [allRouteRecords, setAllRouteRecords] = useState([]);
    const [uniqueMarkers, setUniqueMarkers] = useState([]);
    const [directionsResponses, setDirectionsResponses] = useState({});
    const [orderColors, setOrderColors] = useState({});
    const googleMap = useGoogleMapContext();
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
        lat: 52.25942611694336,
        lng: -7.0978
    };

    const options = {
        language: 'en',
        region: 'IE',
    };

    useEffect(() => {
        if (isLoaded) {
            const fetchRouteRecords = async () => {
                const response = await transferCusTrackParcelRouteAddressToLatAndLng(googleMap.customerTrackingRouteAddresses);
                if (response.success) {
                    setAllRouteRecords(response.data);
                } else {
                    console.error("Failed to fetch route record data");
                }
            };

            fetchRouteRecords();
        }
    }, [googleMap.customerTrackingRouteAddresses, isLoaded]);

    useEffect(() => {
        const uniqueMarkers = Array.from(new Set(allRouteRecords.flatMap(route => route.routeRecord)
            .map(marker => JSON.stringify({
                latitude: marker.latitude,
                longitude: marker.longitude,
                addressType: marker.addressType,
                address: marker.address
            })))
        ).map(item => JSON.parse(item));

        setUniqueMarkers(uniqueMarkers);

        const newOrderColors = {};
        allRouteRecords.forEach(routeRecord => {
            newOrderColors[routeRecord.orderId] = randomColor({
                luminosity: 'dark',
                format: 'hsl',
            });
        });
        setOrderColors(newOrderColors);
    }, [allRouteRecords]);

    useEffect(() => {
        const map = mapRef.current;
        if (map && uniqueMarkers.length) {
            const bounds = new google.maps.LatLngBounds();
            uniqueMarkers.forEach(marker => {
                const position = new google.maps.LatLng(marker.latitude, marker.longitude);
                bounds.extend(position);
            });
            map.fitBounds(bounds);
        }
    }, [uniqueMarkers]);

    const getRouteOptions = (orderRoute) => {
        const waypointRecord = orderRoute.routeRecord.find(record => record.addressType === 'COL-Parcel Hub');
        const origin = orderRoute.routeRecord.find(record => record.addressType === 'ORG-Shipper');
        const destination = orderRoute.routeRecord.find(record => record.addressType === 'DST-Parcel Station');

        const waypoints = waypointRecord ? [{
            location: {lat: waypointRecord.latitude, lng: waypointRecord.longitude},
            stopover: true
        }] : [];

        return {
            origin: {lat: origin.latitude, lng: origin.longitude},
            destination: {lat: destination.latitude, lng: destination.longitude},
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        };
    };

    const directionsCallback = (routeRecord, res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setDirectionsResponses(prev => ({...prev, [routeRecord.orderId]: res}));
            } else {
                console.error(`error fetching directions for order ${routeRecord.orderId}: `, res);
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

    const RenderMarkerBetweenStartAndWaypoint = ({routeRecordRes, routeRecord}) => {
        if (routeRecordRes) {
            const titleInfo = `Order Id: ${routeRecord.orderId}\nFrom: ${routeRecord.routeRecord[0].addressType} - ${routeRecord.routeRecord[0].address}\nTo: ${routeRecord.routeRecord[routeRecord.routeRecord.length - 1].addressType} - ${routeRecord.routeRecord[routeRecord.routeRecord.length - 1].address}`;
            const midpoint = routeRecordRes[30];
            return <Marker
                position={{lat: midpoint.lat(), lng: midpoint.lng()}}
                icon={{
                    url: '/assets/icons/googleMap/Truck.png',
                    scaledSize: new window.google.maps.Size(80, 80),
                    anchor: new window.google.maps.Point(58, 50)
                }}
                title={titleInfo}
            />;
        }
        return null;
    };

    return (
        <Box>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                options={options}
                onLoad={map => mapRef.current = map}
            >
                {allRouteRecords.map((routeRecord) => {
                    const routeColor = orderColors[routeRecord.orderId] || '#63a9ee';
                    if (directionsResponses[routeRecord.orderId]) {
                        return (
                            <React.Fragment key={`fragment-${routeRecord.orderId}`}>
                                <DirectionsRenderer
                                    key={`directions-${routeRecord.orderId}`}
                                    options={{
                                        directions: directionsResponses[routeRecord.orderId],
                                        suppressMarkers: true,
                                        polylineOptions: {
                                            strokeColor: routeColor,
                                            strokeOpacity: 0.8,
                                            strokeWeight: 6.5,
                                        },
                                    }}
                                />
                                <RenderMarkerBetweenStartAndWaypoint key={`midpoint-${routeRecord.orderId}`}
                                                                     routeRecordRes={directionsResponses[routeRecord.orderId].routes[0].overview_path}
                                                                     routeRecord={routeRecord}/>
                            </React.Fragment>
                        );
                    }

                    const routeOptions = getRouteOptions(routeRecord);
                    return (
                        <DirectionsService
                            key={routeRecord.orderId}
                            options={routeOptions}
                            callback={(res) => directionsCallback(routeRecord, res)}
                        />
                    );
                })}

                {uniqueMarkers.map((marker, index) => {
                    return <RenderMarker key={index} marker={marker}/>
                })}
            </GoogleMap>
        </Box>
    );
}


