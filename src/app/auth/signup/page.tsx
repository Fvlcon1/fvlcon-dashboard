'use client';

import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecretAgentIcon from '../../../assets/FVLCON3.png';
import UserPool from '../components/UserPool';
import '../../styles/index.css';  // Custom styles
import { useRouter } from 'next/navigation';
import { message } from 'antd';

// Dark theme configuration with Orbitron font
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1c1c1c',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
  },
});

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [companyCode, setCompanyCode] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      email: formData.get("email"),
      companyCode: formData.get("companyCode"),
      password: formData.get("password"),
    };

    setLoading(true);
    setError("");

    // Redirect to the verification page immediately

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        message.error(result.error)
        setError(result.error || 'Something went wrong.');
      } else {
        message.success("Sign up successful")
        router.push('/auth/login')
      }
    } catch (error : any) {
      console.error("Error registering user:", error);
      setError(error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: 'Orbitron, sans-serif', // Ensure it's applied globally
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ mt: -3, bgcolor: 'transparent', width: 72, height: 72 }}
          >
            <img src={SecretAgentIcon.src} alt="Secret Agent Icon" style={{ width: '100%', height: '90%' }} />
          </Avatar>
          <Typography component="h2" variant="h6" sx={{ mt: 2, letterSpacing: 2, color: theme.palette.primary.main }}>
            SIGN UP
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  id="companyCode"
                  label="Company Code"
                  name="companyCode"
                  autoComplete="companyCode"
                  autoFocus
                  value={companyCode}
                  onChange={(event) => setCompanyCode(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif', // Orbitron applied here
                  }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif', // Orbitron applied here
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif', // Orbitron applied here
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif', // Orbitron applied here
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{
                    '& label.Mui-focused': { color: 'white' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 3 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#121212',
            padding: '8px',
            textAlign: 'center',
            color: '#aaaaaa',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            zIndex: 100,
          }}
        >
          ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
        </Box>
      </Container>
    </ThemeProvider>
  );
}
