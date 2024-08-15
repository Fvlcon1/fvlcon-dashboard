'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, createTheme, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import logoImage from '../../assets/FVLCON3.png';
import '../styles/index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#aaaaaa',
    },
    background: {
      default: '#000',
      paper: '#111',
    },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif', 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #333 30%, #444 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          margin: '20px',
          transition: 'background-color 0.3s ease', // Smooth transition effect
          '&:hover': {
            backgroundColor: '#292929', // Darker background on hover
          },
        },
      },
    },
  },
});

const CompanyCodePage: React.FC = () => {
  const [companyCode, setCompanyCode] = useState<string>('');
  const router = useRouter();

  const handleCodeSubmit = () => {
    router.push('/auth/login'); // Navigate to the next page
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Use minHeight to ensure full height
          position: 'relative', // Ensure positioning context for footer
          overflow: 'hidden', // Prevent scrolling
          backgroundColor: 'background.default',
        }}
      >
        {/* Use the Image component from next/image */}
        <Image src={logoImage} alt="Company Logo" width={194} height={194} style={{ marginBottom: '30px' }} />
        
        <TextField
          label="Company Code"
          variant="outlined"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          sx={{
            mb: 2,
            width: '80%',
            maxWidth: '500px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Rounded input field
              background: '#333', // Dark background
              color: 'white', // Text color
            },
            '& label.Mui-focused': {
              color: '#c7c7c7', // Focused label color
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c7c7c7', // Border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c7c7c7', // Border color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c7c7c7', // Border color when focused
            },
          }}
        />
        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={handleCodeSubmit}
        >
          Submit
        </Button>

        {/* Footer remains visible */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            textAlign: 'center',
            width: '100%',
            fontFamily: 'Orbitron, sans-serif', // Ensure Orbitron font is applied
            fontSize: '0.75rem', // Adjust font size as needed
            color: '#aaaaaa', // Text color
          }}
        >
          ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CompanyCodePage;