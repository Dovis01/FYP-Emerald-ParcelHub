import {Box, Card, CardContent, CardHeader, Paper} from "@mui/material";
import {useAuthContext} from "@/contexts/auth-context";
import Typography from "@mui/material/Typography";

export const StationImageDisplay = () => {
    const {user} = useAuthContext();
    return (
        <Paper elevation={10} sx={{width: '150%', height: '100%'}}>
            <Card>
                <CardHeader
                    title={
                        <Box>
                            <Typography variant="h6" component="span">
                                Parcel Station Image Display:
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: -2.6
                        }}
                    >
                        <img
                            alt="Station Display Image"
                            src={user.roleType === 'Station-Manager' ? '/assets/icons/stationDisplay/ParcelHubStation.jpg'
                                : '/assets/icons/stationDisplay/NoStationDisplay.jpg'}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                border: '5.5px solid',
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}
