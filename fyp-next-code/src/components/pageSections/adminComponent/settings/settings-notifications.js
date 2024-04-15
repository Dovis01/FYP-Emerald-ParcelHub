import {useCallback} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel, Paper,
    Stack,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';

export const SettingsNotifications = () => {
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={10} sx={{width: '183%', height: '100%'}}>
                <Card>
                    <CardHeader
                        subheader="Manage the notifications"
                        title="Notifications"
                        sx={{mt: 2.2, ml: 4, mb: -2.5}}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid
                            container
                            spacing={6}
                            wrap="wrap"
                        >
                            <Grid
                                lg={6}
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <Stack spacing={1} sx={{ml: 4}}>
                                    <Typography variant="h6">
                                        Notifications
                                    </Typography>
                                    <Stack>
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked/>}
                                            label="Email"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked/>}
                                            label="Push Notifications"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox/>}
                                            label="Text Messages"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked/>}
                                            label="Phone calls"
                                        />
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid
                                lg={6}
                                md={4}
                                sm={6}
                                xs={12}
                            >
                                <Stack spacing={1} sx={{ml: 4}}>
                                    <Typography variant="h6">
                                        Messages
                                    </Typography>
                                    <Stack>
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked/>}
                                            label="Email"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox/>}
                                            label="Push Notifications"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox defaultChecked/>}
                                            label="Phone calls"
                                        />
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" sx={{mr: 3.5, mb: 3.5}}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </form>
    );
};
