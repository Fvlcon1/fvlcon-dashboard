'use client';

import React, { useEffect, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecretAgentIcon from '../../../assets/FVLCON3.png';
import '../../styles/index.css';
import { signIn, useSession } from "next-auth/react";
import { message } from 'antd';
import Link from 'next/link';

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

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const params = useSearchParams()

  if (session)
    window.location.href = "/agreementpage"

  const redirectError = params.get("error")
  let hasDisplayedRedirectError = false

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (res?.error) {
        console.error('Login error:', res.error);
        setError(res.error || 'An error occurred while logging in');
        message.error(res.error)
      } else {
        console.log('Login success', res);
        message.success("Login Successful")
        window.location.href = '/agreementpage'
      }
    } catch (err : any) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
      message.error(err.message)
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    if (redirectError && !hasDisplayedRedirectError) {
      hasDisplayedRedirectError = true
      message.error(redirectError)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
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
          <Typography component="h6" variant="h5" sx={{ mt: 2, letterSpacing: 2, color: theme.palette.primary.main }}>
            LOGIN
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                    }
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
                  autoComplete="current-password"
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
                    }
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            {/* adding Forgot Password link aligned to the right */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/forgot-password" passHref>
                  <Typography
                    sx={{
                      color: '#aaa',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      fontFamily: 'Roboto, sans-serif',  // overriding font to Roboto
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Grid>
            </Grid>
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
};

export default Login;
