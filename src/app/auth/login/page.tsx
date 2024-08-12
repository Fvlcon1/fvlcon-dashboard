'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../components/UserPool';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Updated theme
const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode theme
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Merriweather', 
      'serif',
    ].join(','),
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event : any) => {
      // Log out the user when leaving the page
      const user = userPool.getCurrentUser();
      if (user) {
        user.signOut();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (event : any) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email.toLowerCase(),
      Pool: userPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email.toLowerCase(),
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data : any) => {
        console.log('Login success', data);
        navigate.push('/dashboard/home');
      },
      onFailure: (err : any) => {
        console.error('Login error', err);
        setError(err.message || 'An error occurred while logging in');
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{
                '& label.Mui-focused': { color: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{
                '& label.Mui-focused': { color: 'white' },
                '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                }
              }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 3 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}>
              Sign In
            </Button>
            <Grid container>
              {/* Additional Grid items if needed */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
