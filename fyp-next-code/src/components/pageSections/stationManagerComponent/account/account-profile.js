import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider, Paper,
    Typography
} from '@mui/material';
import {useAuthContext} from "@/contexts/auth-context";
import * as React from "react";
import {disableStationManager} from "@/api/springboot-api";
import {toast} from "react-toastify";
import {SeverityPill} from "@/components/customized/severityPill";

export const AccountProfile = () => {
    const auth = useAuthContext();

    const handleAvatarFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
    }

    const handleDisableStationManager = async () => {
        const result = await disableStationManager(auth.user.stationManagerId);
        if (result.success) {
            toast.success('Apply for absence successfully!');
        } else {
            toast.error('Ooops! Apply for absence failed.');
        }
    }

    return (
        <Paper elevation={10} sx={{width: '150%', height: '100%'}}>
            <Card>
                <CardContent sx={{mt: 2.5}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src='/assets/avatars/avatar-anika-visser.png'
                            sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                            }}
                        />
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            {auth.currentUsername}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            {auth.user.city} {auth.user.country}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                justifyContent: 'center',
                                mt: 0.4
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                sx={{
                                    fontSize: '0.95rem',
                                    fontWeight: 'bold',
                                    mt: 1,
                                    mr: 0.8
                                }}
                            >
                                Role Status:
                            </Typography>
                            <SeverityPill color={auth.user?.status === true ? 'success' : 'warning'} sx={{mt: 1}}>
                                {auth.user?.status === true ? 'Active' : 'Absent'}
                            </SeverityPill>
                        </Box>
                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: '0.95rem',
                                fontWeight: 'bold',
                                mt: 3.3,
                            }}
                        >
                            Work From: {''}
                            <Box
                                component="a"
                                sx={{color: 'primary.main'}}
                                target="_blank"
                            >
                                {auth.user?.startDate}
                            </Box>
                            {''} To: {''}
                            <Box
                                component="a"
                                sx={{color: 'primary.main'}}
                                target="_blank"
                            >
                                {auth.user?.endDate}
                            </Box>
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: '0.95rem',
                                fontWeight: 'bold',
                                mt: 1,
                            }}
                        >
                            Register Time: {''}
                            <Box
                                component="a"
                                sx={{color: 'primary.main',ml:4}}
                                target="_blank"
                            >
                                {auth.user?.registerTime}
                            </Box>
                        </Typography>
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            mt: 26.9,
                            width: '80%',
                        }}
                    >
                        <input
                            style={{display: 'none'}}
                            id="raised-button-avatar"
                            type="file"
                            onChange={handleAvatarFileChange}
                        />
                        <label htmlFor="raised-button-avatar">
                            <Button
                                fullWidth
                                component="span"
                                variant="contained"
                            >
                                Upload picture
                            </Button>
                        </label>
                        <Button
                            fullWidth
                            color="error"
                            variant="contained"
                            sx={{mt: 1.5}}
                            onClick={handleDisableStationManager}
                        >
                            Apply For Absence
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Paper>
    )
};
