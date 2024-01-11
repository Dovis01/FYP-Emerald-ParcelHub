import {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, Paper,
    Stack,
    TextField
} from '@mui/material';

export const SettingsPassword = () => {
    const [values, setValues] = useState({
        password: '',
        confirm: ''
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={10} sx={{width: '100%', height: '100%', ml: 20}}>
                <Card>
                    <CardHeader
                        subheader="Update password"
                        title="Password"
                        sx={{mt:2.2,ml:4,mb:-2.5}}
                    />
                    <Divider/>
                    <CardContent>
                        <Stack
                            spacing={3}
                            sx={{maxWidth: 400, ml: 4}}
                        >
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            <TextField
                                fullWidth
                                label="Password (Confirm)"
                                name="confirm"
                                onChange={handleChange}
                                type="password"
                                value={values.confirm}
                            />
                        </Stack>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" sx={{mr: 3.5, mb: 3.5}}>
                            Update
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </form>
    );
};
