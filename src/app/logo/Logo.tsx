'use client'

import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Merriweather',
      'serif',
    ].join(','),
    h2: {
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 400,
    },
  },
});

const Logo = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/company-code'); 
    }, 1000); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}>
        {/* Main Text */}
        <Typography variant="h2" component="h1" style={{
          color: 'white', userSelect: 'none', transition: 'opacity 1s ease',
        }}>
          FVLCON
        </Typography>
        {/* Loading Icon */}
        <CircularProgress size={24} style={{ color: 'white', margin: '20px', transition: 'visibility 0s 1s' }} />
        {/* Subtitle Text */}
        <Typography variant="subtitle1" style={{
          color: 'white', userSelect: 'none', marginTop: '20px', transition: 'opacity 1s ease',
        }}>
          BLVCK SVPPHIRE
        </Typography>
      </div>
    </ThemeProvider>
  );
};

export default Logo;
