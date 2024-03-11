import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterUserForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const formData = new FormData();
            formData.append('firstname', firstName);
            formData.append('lastname', lastName);

            const response = await axios.post('http://hyeumine.com/newuser.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            localStorage.setItem('userId', response.data.id);
            navigate(`/notes`, { state: { userId: response.data.id } });
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Failed to register user.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                mt: 1,
                padding: '16px',
                '.MuiTextField-root': {
                    marginBottom: '8px',
                    '& input': {
                        fontSize: '0.875rem',
                    },
                },
                '.MuiButton-contained': {
                    padding: '10px 15px',
                    borderRadius: '5px',
                },
            }}
        >
            <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
                margin="normal"
                sx={{
                    boxShadow: '0px 3px 6px #00000029',
                    borderRadius: '3px',
                }}
            />

            <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
                margin="normal"
                sx={{
                    boxShadow: '0px 3px 6px #00000029',
                    borderRadius: '3px',
                }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>

            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default RegisterUserForm;
