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

export const AccountProfile = () => {
    const auth = useAuthContext();
    return (
        <Paper elevation={10} sx={{width: '150%', height: '100%'}}>
            <Card>
                <CardContent sx={{mt:6}}>
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
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button
                        fullWidth
                        variant="text"
                    >
                        Upload picture
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
