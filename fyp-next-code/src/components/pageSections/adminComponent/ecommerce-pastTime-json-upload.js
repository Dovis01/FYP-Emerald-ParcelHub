import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Icon,
    Typography,
} from '@mui/material';
import {useCallback, useState} from "react";
import SouthIcon from '@mui/icons-material/South';
import * as React from "react";
import {toast} from "react-toastify";

export const PastTimeJSONDataFileUpload = ({onUpload}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragEnter = useCallback((event) => {
        event.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setIsDragOver(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            setSelectedFile(files[0]);
        }
    }, []);

    const handleFileUpload = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target.result);
                    onUpload(json.simulation_past_data); // Callback function to pass the JSON to the parent component or to make an API call
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleFileReset = () => {
        setSelectedFile(null);
        toast.success('JSON Data File Reset Successfully!')
    }

    return (
        <Box
            sx={{
                width: '172.9vh', height: '100%',
                boxShadow: 20,
                border: 5,
                borderColor: 'primary.main',
                borderRadius: 3
            }}
        >
            <Card>
                <CardContent>
                    <Typography
                        align="center"
                        color="inherit"
                        sx={{
                            fontSize: '34px',
                            lineHeight: '32px',
                            mb: 5,
                            mt: 2.5
                        }}
                        variant="h1"
                    >
                        Past Time Json Data Upload Entry Point
                    </Typography>
                    <Typography
                        align="center"
                        color="inherit"
                        sx={{
                            fontSize: '17px',
                            lineHeight: '20px',
                            mt: 0.5
                        }}
                        variant="body1"
                    >
                        You can upload a past time Json file by the button below or by dragging and dropping the file here.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt:2.8,
                            mb:-4.2
                        }}
                    >
                        <Icon fontSize="medium">
                            <SouthIcon/>
                        </Icon>
                    </Box>
                    <Box
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        sx={{
                            p: 3,
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            border: isDragOver ? '2px dashed #000' : '2px solid transparent'
                        }}
                    >
                        <input
                            accept=".json"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" sx={{px: 8, py: 1.8,mt:2.5}}>
                                Choose JSON File To Upload
                            </Button>
                        </label>
                        {isDragOver && (
                            <Typography variant="body1" fontWeight="bold" sx={{mt: 1.8,mb:-1}}>
                                Drop the file here...
                            </Typography>
                        )}
                        {selectedFile && (
                            <Typography variant="body1" fontWeight="bold" sx={{mt: 2, mb: -2}}>
                                {selectedFile.name}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button
                        variant="text"
                        onClick={handleFileUpload}
                        disabled={!selectedFile}
                        sx={{mt: -4.8, mb: 2.8, fontSize: '16px', fontWeight: 'bold'}}
                    >
                        Upload JSON Data File
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleFileReset}
                        sx={{mt: -4.8, mb: 2.8, fontSize: '16px', fontWeight: 'bold'}}
                    >
                        Reset JSON Data File
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
};
