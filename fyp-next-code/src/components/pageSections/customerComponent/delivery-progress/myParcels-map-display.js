import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {Box} from "@mui/material";

export const GoogleMapDisplay = () => {
    const containerStyle = {
        width: '172.1vh',
        height: '70vh'
    };

    const center = {
        lat: 52.2411994934082,
        lng: -7.130422592163086
    };

    const markerPosition = {
        lat: 52.2411994934082,
        lng: -7.130422592163086
    };

    const options = {
        language: 'en',
        region: 'IE',
    };

    const svgIconUrl = '/assets/icons/truck.svg';

    return (
        <Box>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                language="en"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={16}
                    options={options}
                >
                    <Marker
                        position={markerPosition}
                        draggable
                        title="This is my home"
                        label="M"
                    />
                </GoogleMap>
            </LoadScript>
        </Box>
    );
}


