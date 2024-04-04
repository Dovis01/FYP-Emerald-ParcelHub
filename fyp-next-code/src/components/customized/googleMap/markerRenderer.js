import {Marker} from "@react-google-maps/api";
import {useTheme} from "@mui/material/styles";

export const RenderMarker = ({marker}) => {
    const theme = useTheme();
    const eirCode = marker.address.split(',')[marker.address.split(',').length-1];
    const icon = {
        url: '/assets/icons/googleMap/MarkLabel.png',
        scaledSize: new window.google.maps.Size(140, 140),
        labelOrigin: new window.google.maps.Point(86, 69),
        anchor: new window.google.maps.Point(70, 105)
    };

    const label = {
        text: marker.addressType,
        color: theme.palette.customized.mapCol,
        fontSize: "10.6px",
        fontWeight: "bolder"
    };

    return (
        <Marker
            key={`${marker.latitude}-${marker.longitude}`}
            position={{lat: marker.latitude, lng: marker.longitude}}
            label={label}
            icon={icon}
            title={`${marker.addressType} Eircode:${eirCode}`}
        />
    );
};
