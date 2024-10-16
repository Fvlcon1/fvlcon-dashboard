'use client';

import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Box, Button, TextField, createTheme, ThemeProvider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import logoImage from '../../assets/FVLCON3.png';
import '../styles/index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#807d7d',
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

const CompanyCodePage: React.FC = () => {
  const [companyCode, setCompanyCode] = useState<string>('');
  const router = useRouter();

  const handleCodeSubmit = () => {
    // Validate the code before pushing
    if (companyCode) {
      router.push('/auth/login'); // Navigate to the next page
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Company Logo */}
        <Image src={logoImage} alt="Company Logo" width={124} height={124} style={{ marginBottom: '30px' }} />

        {/* Company Code Input */}
        <TextField
          fullWidth
          label="Company Code"
          variant="outlined"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          color="primary"
          sx={{
            mb: 1,
            '& label': { color: 'white' }, // Label color
            '& label.Mui-focused': { color: 'white' }, // Focused label color
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' }, // Default border
              '&:hover fieldset': { borderColor: 'white' }, // Hover border
              '&.Mui-focused fieldset': { borderColor: 'white' }, // Focused border
              backgroundColor: '#333', // Dark input background
              color: 'white', // Input text color
            },
            '& .MuiInputBase-input': {
              color: 'white', // Ensures the typed text is white
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{
            mt: 0,
            backgroundColor: '#fff', // Button background color
            '&:hover': {
              backgroundColor: '#f2f2f2', // Lighter color on hover
            },
            color: '#000', // Button text color
          }}
          endIcon={<ArrowForwardIcon />}
          onClick={handleCodeSubmit}
        >
          Submit
        </Button>

        {/* Footer Text */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            textAlign: 'center',
            width: '100%',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            color: '#aaaaaa',
          }}
        >
          ©️ 2024 • BLVCK SAPPHIRE • All Rights Reserved
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CompanyCodePage;
