import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    useJsApiLoader
} from '@react-google-maps/api';
import {Box} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {
    getAddressLatitudeAndLongitude,
} from "@/api/springboot-api";
import {useGoogleMapContext} from "@/contexts/googleMap-context";
import randomColor from "randomcolor";
import {RenderMarker} from "@/components/customized/googleMap/markerRenderer";

export const PickupGoogleMapDisplay = () => {
    const [addressInfo, setAddressInfo] = useState([]);
    const [directionsResponses, setDirectionsResponses] = useState({});
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
        tilt: 45,
        language: 'en',
        region: 'IE',
    };

    useEffect(() => {
        if (isLoaded) {
            const fetchAddressInfo = async () => {
                const response = await getAddressLatitudeAndLongitude(googleMap.customerStationAddresses);
                if (response.success) {
                    response.data.id = response.data[0]?.geocodingId;
                    setAddressInfo(response.data);
                } else {
                    console.error("Failed to fetch marker data");
                }
            };

            fetchAddressInfo();
        }
    }, [googleMap.customerStationAddresses, isLoaded]);

    useEffect(() => {
        const map = mapRef.current;
        if (map && addressInfo.length) {
            const bounds = new google.maps.LatLngBounds();
            addressInfo.forEach(marker => {
                const position = new google.maps.LatLng(marker.latitude, marker.longitude);
                bounds.extend(position);
            });
            map.fitBounds(bounds);

            const listener = google.maps.event.addListener(map, "bounds_changed", () => {
                setTimeout(() => {
                    const currentZoom = map.getZoom();
                    map.setZoom(currentZoom - 0.5);
                }, 201);
                google.maps.event.removeListener(listener);
            });
        }
    }, [addressInfo]);

    const getRouteOptions = (route) => {
        const origin = route.find(record => record.addressType === 'Customer\'s Address');
        const destination = route.find(record => record.addressType === 'DST-Parcel Station');
        return {
            origin: {lat: origin.latitude, lng: origin.longitude},
            destination: {lat: destination.latitude, lng: destination.longitude},
            travelMode: 'DRIVING'
        };
    };

    const directionsCallback = (routeRecord, res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setDirectionsResponses(prev => ({...prev, [routeRecord.id]: res}));
            } else {
                console.error(`error fetching directions for order ${routeRecord.id}: `, res);
            }
        }
    };

    const renderDirections = (addressInfo) => {
        if (directionsResponses[addressInfo.id]) {
            return (
                <DirectionsRenderer
                    key={addressInfo.id}
                    options={{
                        directions: directionsResponses[addressInfo.id],
                        suppressMarkers: true,
                        polylineOptions: {
                            strokeColor: randomColor({luminosity: 'dark', hue: 'red'}),
                            strokeOpacity: 0.8,
                            strokeWeight: 6.5,
                        },
                    }}
                />
            );
        } else {
            const routeOptions = getRouteOptions(addressInfo);
            return (
                <DirectionsService
                    key={addressInfo.id}
                    options={routeOptions}
                    callback={(res) => directionsCallback(addressInfo, res)}
                />
            );
        }
    };

    if (loadError) {
        console.error("Google Maps API failed to load: ", loadError);
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                options={options}
                onLoad={map => mapRef.current = map}
            >
                {addressInfo.length >= 2 ? renderDirections(addressInfo) : null}
                {addressInfo.map((marker, index) => {
                    return (
                        <>
                            <RenderMarker marker={marker} key={index}/>
                        </>
                    )
                })}
            </GoogleMap>
        </Box>
    );
}


