import {Box, Card, CardContent, Grid, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAuthContext} from "@/contexts/auth-context";

export const TruckInfoDisplay = () => {
    const {user} = useAuthContext();

    return (
        <Paper elevation={10} sx={{width: '195%', height: '100%', ml: 20.4}}>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            ml:0.7,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" sx={{pt:3,pb:2,mt:-3}}>
                            Truck Information
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Truck Plate Number"
                                    name="truckPlateNumber"
                                    value={user?.truckPlateNumber ? user.truckPlateNumber : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Truck Type"
                                    name="truckType"
                                    value={user?.truckType ? user.truckType : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Max Weight"
                                    name="maxWeight"
                                    value={user?.maxWeight ? user.maxWeight +' (kg)' : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Max Volume"
                                    name="maxVolume"
                                    value={user?.volume ? user.volume +' (m³)' : ''}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{pt:3,pb:2}}>
                            Storage Area Info
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Storage Area Length"
                                    name="storageAreaLength"
                                    value={user?.storageAreaLength ? user.storageAreaLength +' (m)' : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Storage Area Width"
                                    name="storageAreaWidth"
                                    value={user?.storageAreaWidth ? user.storageAreaWidth +' (m)' : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Storage Area Height"
                                    name="storageAreaHeight"
                                    value={user?.storageAreaHeight ? user.storageAreaHeight +' (m)' : ''}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}
