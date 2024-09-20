'use client'

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
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { useState } from 'react';

const UserPool = new CognitoUserPool({
  UserPoolId: "eu-north-1_bA7RndLAT",
  ClientId: "3f5v8keobedm2otis1htctnk6h"
});

function VerificationPage() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleVerification = (event : any) => {
    event.preventDefault();

    const user = new CognitoUser({ Username: email, Pool: UserPool });
    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        setVerificationError(err.message || 'Verification error');
        return;
      }
      console.log('Verification successful', result);
      setVerificationSuccess(true);
    });
  };

  const defaultTheme = createTheme();

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
            Email Verification
          </Typography>
          {verificationSuccess ? (
            <Box sx={{ mt: 3 }}>
              <Typography component="p" variant="body1" align="center" color="success">
                Email verification successful!
              </Typography>
              <Button
                component={Link}
                href="/reset-password"
                variant="outlined"
                fullWidth
                color="primary"
                sx={{ mt: 3 }}
              >
                Reset Password
              </Button>
            </Box>
          ) : (
            <Box component="form" noValidate onSubmit={handleVerification} sx={{ mt: 3 }}>
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
              />
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
              />
              {verificationError && (
                <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                  {verificationError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default VerificationPage;
