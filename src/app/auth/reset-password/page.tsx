'use client'

import React, { useState } from 'react';
import userPool from '../components/UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
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

const defaultTheme = createTheme();

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: userPool,
    })
  }

  const sendCode = (event : any) => {
    event.preventDefault();
    getUser().forgotPassword({
      onSuccess: data => {
        console.log("onsuccess", data)
      },
      onFailure: err => {
        console.error('onFailure', err);
        setError(err.message || 'An error occurred');
      },
      inputVerificationCode: data => {
        console.log("Input code:", data);
        setStage(2);
      }
    })
  }

  const resetPassword = (event:any) => {
    event.preventDefault();

    // Check if the new password contains at least one uppercase character
    if (!/(?=.*[A-Z])/.test(newPassword)) {
      setError('Password must have uppercase characters');
      return;
    }

    getUser().confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        console.log('Password reset successfully');
      },
      onFailure: err => {
        console.error('Password reset failed', err);
        setError(err.message || 'An error occurred');
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {stage === 1 && (
            <Box component="form" noValidate onSubmit={sendCode} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Code
              </Button>
            </Box>
          )}
          {stage === 2 && (
            <Box component="form" noValidate onSubmit={resetPassword} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="verificationCode"
                    label="Verification Code"
                    name="verificationCode"
                    autoComplete="verificationCode"
                    value={verificationCode}
                    onChange={event => setVerificationCode(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    type="password"
                    name="newPassword"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          )}
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 3 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
