import {Box, Card, CardContent, CardHeader, Paper} from "@mui/material";
import {useAuthContext} from "@/contexts/auth-context";
import Typography from "@mui/material/Typography";

export const TruckImageDisplay = () => {
    const {user} = useAuthContext();
    return (
        <Paper elevation={10} sx={{width: '150%', height: '100%'}}>
            <Card>
                <CardHeader
                    title={
                        <Box>
                            <Typography variant="h6" color="primary" component="span">
                                {user.truckType ? user.truckType : 'No'}
                            </Typography>
                            <Typography variant="h6" component="span">
                                {' '}Type Truck Image Display:
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
                            height: '228px'
                        }}
                    >
                        <img
                            alt="Truck Display Image"
                            src={user.truckType ?
                                `/assets/icons/truckDisplay/Truck_${user?.truckType}.png` :
                                '/assets/icons/truckDisplay/Truck_NoTruck.png'}
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}
