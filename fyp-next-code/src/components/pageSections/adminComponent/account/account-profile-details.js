import {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, FormControl, InputLabel, Paper, Select,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import {styled} from '@mui/system';

const CustomScrollMenu = styled('div')({
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#5e5e5e',
    }
});

const countryMap = [
    "China",
    "America",
    "England",
    "Ireland",
    "Australia",
    "France",
    "Japan",
    "Germany"
];

const countryCitiesMap = {
    america: [
        "New York", "California", "Washington", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio"
    ],
    england: [
        "London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Bristol", "Newcastle", "Sheffield"
    ],
    ireland: [
        "Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Dundalk", "Bray"
    ],
    france: [
        "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier"
    ],
    germany: [
        "Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Dresden"
    ],
    japan: [
        "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Nagoya", "Fukuoka", "Sapporo", "Kobe"
    ],
    australia: [
        "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Hobart"
    ],
    china: [
        "Beijing", "Shanghai", "Nanjing", "Hangzhou", "Nantong", "Suzhou", "Wuxi", "Xuzhou", "Rugao", "Dongtai"
    ],
};

export const AccountProfileDetails = () => {
    const [country, setCountry] = useState('china');
    const [updatedUser, setUpdatedUser] = useState(null);
    const [values, setValues] = useState({
        firstName: 'Shijin',
        lastName: 'Zhang',
        email: '20104636@mail.wit.ie',
        phone: '',
        state: 'Waterford',
        country: 'Ireland'
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

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setUpdatedUser({...updatedUser, country: event.target.value});
    };

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Paper elevation={10} sx={{width: '195%', height: '100%', ml: 20.4}}>
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                        sx={{ml: 4, mt: 6}}
                    />
                    <CardContent sx={{pt: 0, ml: 4, mr: 3.5, mt: 1}}>
                        <Box sx={{m: -1.5}}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the first name"
                                        label="First name"
                                        name="firstName"
                                        onChange={handleChange}
                                        required
                                        value={values.firstName}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="lastName"
                                        onChange={handleChange}
                                        required
                                        value={values.lastName}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        value={values.email}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="country-label"
                                            required
                                            sx={{
                                                mt: '1px',
                                                '&.MuiInputLabel-shrink': {
                                                    marginTop: '1rem',
                                                },
                                            }}
                                        >
                                            Select Country
                                        </InputLabel>
                                        <Select
                                            value={country}
                                            onChange={handleCountryChange}
                                            // defaultValue={originalUser?.country || ''}
                                            variant="outlined"
                                            labelId="country-label"
                                            sx={{
                                                height: '55px',
                                                '.MuiSelect-select': {
                                                    paddingTop: '33px',
                                                    textAlign: 'left',
                                                }
                                            }}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                getContentAnchorEl: null,
                                                style: {marginTop: '1px', maxHeight: 420},
                                                PaperProps: {
                                                    component: CustomScrollMenu,
                                                },
                                            }}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            {countryMap.map((country) => (
                                                <MenuItem key={country}
                                                          value={country.toLowerCase()}>{country}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="city-label"
                                            required
                                            sx={{
                                                mt: '1px',
                                                '&.MuiInputLabel-shrink': {
                                                    marginTop: '1rem',
                                                },
                                            }}
                                        >
                                            Select City
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            variant="outlined"
                                            labelId="city-label"
                                            sx={{
                                                height: '55px',
                                                '.MuiSelect-select': {
                                                    paddingTop: '33px',
                                                    textAlign: 'left',
                                                }
                                            }}
                                            onChange={(e) => {
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    city: e.target.value
                                                });
                                            }}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                getContentAnchorEl: null,
                                                style: {marginTop: '1px', maxHeight: 420},
                                                PaperProps: {
                                                    component: CustomScrollMenu,
                                                },
                                            }}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            {countryCitiesMap[country] ? countryCitiesMap[country].map((city) => (
                                                <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
                                            )) : null}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" sx={{mr: 3.5, mb: 8}}>
                            Save details
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </form>
    );
};
