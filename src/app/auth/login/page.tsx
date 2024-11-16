'use client';
import { motion } from 'framer-motion';
import { User, Lock, Building } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { authrorization } from '@/utils/api/authorization';
import { message } from 'antd';
import MFAValidation from '../mfa/MFAValidation';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Box, Grid, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SecretAgentIcon from '../../../assets/FVLCON3.png';
import '../../styles/index.css';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showMfa, setShowMfa] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [timer, setTimer] = useState(5*60);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true)

    const auth = await authrorization({
      email,
      password,
      companyCode,
    })

    if (!auth) {
      setError('Invalid email or password');
      setLoading(false)
    } else {
      setShowMfa(true)
      setLoading(false)
    }
  };

  const resendHandler = async () => {
    const auth = await authrorization({
      email,
      password,
      companyCode,
    })
    
    if (!auth) {
      setError('Invalid email or password');
      setLoading(false)
    } else {
      message.success("Code sent successfully")
      setShowMfa(true)
      setLoading(false)
    }
  }

  const handleMfaSubmit = async () => {
    const result = await signIn('credentials', {
      redirect : false,
      email,
      password,
      companyCode,
    })

    router.push(`/dashboard/home`);
  }

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

  return (
    showMfa ?
    <MFAValidation 
      email={email}
      onSuccess={handleMfaSubmit}
      timer={timer}
      setTimer={setTimer}
      resendHandler={resendHandler}
    />
    :
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ mt: -3, bgcolor: 'transparent', width: 72, height: 72 }}>
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
                    }
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/forgot-password" passHref>
                  <Typography
                    sx={{
                      color: '#aaa',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      fontFamily: 'Roboto, sans-serif',
                      '&:hover': { textDecoration: 'underline' },
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
}
