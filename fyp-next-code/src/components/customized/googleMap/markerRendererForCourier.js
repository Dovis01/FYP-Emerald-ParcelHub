import {InfoWindow, Marker} from "@react-google-maps/api";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {Box, Typography} from "@mui/material";

export const RenderMarkerForCourier = ({marker}) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const icon = {
        url: '/assets/icons/googleMap/MarkLabel.png',
        scaledSize: new window.google.maps.Size(140, 140),
        labelOrigin: new window.google.maps.Point(86, 69),
        anchor: new window.google.maps.Point(70, 105)
    };

    const label = {
        text: marker.addressGeoInfo.addressType,
        color: theme.palette.customized.mapCol,
        fontSize: "10.6px",
        fontWeight: "bolder"
    };

    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const infoWindowContent = (
        <Box>
            {marker.parcelTrackingCodes && marker.parcelTrackingCodes.length > 0 ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent:'space-between'}}>
                        <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '13.5px',mr:0.5}}>
                            Parcel Track Code(s):
                        </Typography>
                        <Typography component="span" sx={{ fontSize: '13px',mt:0.1}}>
                            {marker.parcelTrackingCodes[0]}
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        {marker.parcelTrackingCodes.slice(1).map(Trackingcode => (
                            <Typography key={Trackingcode} sx={{fontSize:'13px'}}>
                                {Trackingcode}
                            </Typography>
                        ))}
                    </Box>
                </>
            ) : null}
            <Box sx={{ display: 'flex', justifyContent:'space-between'}}>
                <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '13.5px'}}>
                    {marker.addressGeoInfo.addressType} Eircode:&nbsp;
                </Typography>
                <Typography component="span" sx={{ fontWeight:'bold', fontSize:'13.5px'}}>
                    {marker.addressGeoInfo.address.split(',')[marker.addressGeoInfo.address.split(',').length-1]}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Marker
            key={`${marker.addressGeoInfo.latitude}-${marker.addressGeoInfo.longitude}`}
            position={{lat: marker.addressGeoInfo.latitude, lng: marker.addressGeoInfo.longitude}}
            label={label}
            icon={icon}
            onClick={handleToggleOpen}
        >
            {isOpen && (
                <InfoWindow
                    onCloseClick={handleToggleOpen}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, 47)
                    }}
                >
                    {infoWindowContent}
                </InfoWindow>
            )}
        </Marker>
    );
};
