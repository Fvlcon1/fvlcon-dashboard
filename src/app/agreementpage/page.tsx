'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CssBaseline, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import agree from '../../assets/FVLCON3.png';
import '../styles/index.css';

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

const Home: React.FC = () => {
  const router = useRouter();

  const handleAgree = () => {
    window.location.href = '/dashboard/home'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          alignItems: 'center', // Center horizontally
          minHeight: '100vh', // Make the container take the full height
          textAlign: 'center', // Center text horizontally
        }}
      >
        <Image
          alt="Logo"
          src={agree}
          placeholder="blur"
          quality={100}
          width={100}
          height={50}
          style={{
            objectFit: 'contain',
            width: '15%',
            height: 'auto',
            display: 'block',
            margin: '0 auto 16px',
          }}
        />

        {/* Secure System Message */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            className='mt-2 font-mono text-gray-500 p-3 mb-5 text-xs'
            component={motion.div}
            initial={{ opacity: -1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 1 }}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            This is a secure system for access by authorized individuals only. The right to use this system is restricted to authorized individuals only and is not transferable to any other person or entity. By clicking{' '}
            <Typography
              variant="body2"
              sx={{
                display: 'inline',
                cursor: 'pointer',
                color: '#19c2ca', // Highlight color
                fontFamily: 'inherit',
                fontWeight: 'bold',
              }}
              onClick={handleAgree}
              component={motion.span}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agree
            </Typography>{' '}
            you acknowledge, understand, and further agree that you are authorized and you will observe and be bound by the{' '}
            <Link href="" className="text-[#19c2ca]">Access and Terms of Use Agreement</Link>.
          </Typography>
        </motion.div>

        {/* Footer */}
        <Typography
          sx={{
            position: 'fixed',
            bottom: 12,
            left: 0,
            width: '100%',
            textAlign: 'center',
            color: '#aaaaaa',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
          }}
        >
          ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
