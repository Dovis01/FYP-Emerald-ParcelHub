import {Box, Card, CardContent, Grid, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAuthContext} from "@/contexts/auth-context";

export const StationInfoDisplay = () => {
    const {user} = useAuthContext();

    return (
        <Paper elevation={10} sx={{width: '195%', height: '100%', ml: 20.4}}>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            ml: 0.7,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" sx={{pt: 3, pb: 2, mt: -3}}>
                            Parcel Station Information
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
                                    label="The City of Station"
                                    name="stationCity"
                                    value={user?.city ? user.city : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Community Name"
                                    name="communityName"
                                    value={user?.communityName ? user.communityName : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Station Address"
                                    name="stationAddress"
                                    value={user?.address ? user.address : ''}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{pt: 3, pb: 2}}>
                            Storage Information
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
                                    label="Total Number of Shelves"
                                    name="shelvesTotalNumber"
                                    value={user?.shelvesTotalNumber ? user.shelvesTotalNumber : ''}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Total Number of Floors for Each Shelf"
                                    name="shelvesTotalNumber"
                                    value={3}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Maximum Number of Parcels to Store"
                                    name="maxParcelNumber"
                                    value={user?.shelvesTotalNumber ? user.shelvesTotalNumber * 24 : ''}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}
