'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '../../assets/FVLCON3.png';
import '../styles/index.css';
import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#000',
      paper: '#111',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
  },
});

const HomePage = () => {
  const router = useRouter();
  const [typedText, setTypedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fvlconText = 'FVLCON';

  useEffect(() => {
    if (currentIndex < fvlconText.length) {
      const interval = setInterval(() => {
        setTypedText((prevText) => prevText + fvlconText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        router.push('auth/login');
      }, 2000);
    }
  }, [currentIndex, fvlconText, router]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: 'background.default',
          paddingBottom: '60px',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\'100%\' height=\'100%\' viewBox=\'0 0 1920 1080\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'960\' cy=\'540\' r=\'8\' fill=\'%23999999\' fill-opacity=\'0.6\'/%3E%3C/svg%3E')] bg-repeat animate-moveParticles"></div>

        <Image
          src={logoImage}
          alt="Company Logo"
          width={124}
          height={124}
          style={{ marginBottom: '30px' }}
          className="transition-transform duration-500 ease-in-out"
        />

        <Typography
          variant="h5"
          className="text-2xl font-thin text-gray-300 user-select-none"
          style={{ zIndex: 10, textShadow: '0 0 5px rgba(0, 0, 0, 0.8)' }}
        >
          {typedText}
        </Typography>

        {typedText === 'FVLCON' && (
          <div className="w-8 h-8 text-gray-400 my-5 animate-spin absolute top-0 left-0 z-20">
            <svg className="w-full h-full" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
          </div>
        )}


        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            textAlign: 'center',
            width: '100%',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            color: '#aaaaaa',
            backgroundColor: 'background.default',
            padding: '10px 0',
            whiteSpace: 'nowrap',
          }}
        >
          ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
