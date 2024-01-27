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

const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Waterford',
    country: 'Ireland',
    jobTitle: 'SETU Student',
    name: 'Shijin Zhang',
    timezone: 'GTM-0'
};

export const AccountProfile = () => (
    <Paper elevation={10} sx={{width: '100%', height: '100%', ml: 22}}>
        <Card>
            <CardContent sx={{mt:2}}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={user.avatar}
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
                        {user.name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.city} {user.country}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {user.timezone}
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
