'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../components/UserPool';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecretAgentIcon from '../../../assets/FVLCON3.png';
import '../../styles/index.css';

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

const VerificationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleVerification = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = new CognitoUser({ Username: email, Pool: userPool });
    user.confirmRegistration(verificationCode, true, (err) => {
      if (err) {
        setVerificationError(err.message || 'Verification error');
        return;
      }
      console.log('Verification successful');
      setVerificationSuccess(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'transparent', width: 72, height: 72 }}>
            <img src={SecretAgentIcon.src} alt="Secret Agent Icon" style={{ width: '100%', height: '90%' }} />
          </Avatar>
          <Typography component="h6" variant="h5" sx={{ color: theme.palette.primary.main }}>
            Email Verification
          </Typography>
          {verificationSuccess ? (
            <Box sx={{ mt: 0 }}>
              <Typography component="p" variant="body1" align="center" color="success">
                Email verification successful!
              </Typography>
              <Button
                component="a"
                href="/reset-password"
                variant="outlined"
                fullWidth
                color="primary"
                sx={{ mt: 0 }}
              >
                Reset Password
              </Button>
            </Box>
          ) : (
            <Box component="form" noValidate onSubmit={handleVerification} sx={{ mt: 1, width: '100%' }}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    color="primary"
                    sx={{
                      '& label.Mui-focused': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="verificationCode"
                    label="Verification Code"
                    type="text"
                    id="verificationCode"
                    autoComplete="off"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    variant="outlined"
                    color="primary"
                    sx={{
                      '& label.Mui-focused': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      }
                    }}
                  />
                </Grid>
              </Grid>
              {verificationError && (
                <Typography variant="body2" color="error" align="center" sx={{ mt: 0 }}>
                  {verificationError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 0 }}
              >
                Verify
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#121212',
            padding: '4px',
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
};

export default VerificationPage;
