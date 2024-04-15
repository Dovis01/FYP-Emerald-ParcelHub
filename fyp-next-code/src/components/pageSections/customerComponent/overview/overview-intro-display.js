import {
    Box,
    Button,
    Card,
    Grid,
    Typography,
} from '@mui/material';
import Image from "next/image";

export const OverviewIntroDisplay = () => {

    return (
        <Card sx={{
            ml: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Box px={1.6} sx={{mt:-2.4,mr:6}}>
                        <Typography gutterBottom component="div" sx={{fontSize:'42px', fontWeight:'805', lineHeight:'48px'}}>
                            Track And Receive Your Parcels with Ease! 🚚
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1.5,mt:4 }}>
                            Your Courier Connoisseurs – Emerald Parcel Hub
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mt:2, mb: 2,fontStyle: 'italic', textDecoration: 'underline' }}>
                            Shipping Made Easy, With You Every Step – We{'\''}re here to ensure your parcels are safely delivered.
                        </Typography>
                        <Button variant="contained" size="large" sx={{mt:8, py:1.5, fontSize:'17px', fontWeight:'700'}}>
                            Start Tracking Now
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        mr:6,
                        mt:4.1
                    }}>
                        <Image
                            src="/assets/logos/ServiceDisplay.png"
                            alt="System Intro Display Image"
                            width={550}
                            height={569}
                            priority
                        />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

