'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Logo from '../logo/Logo'; 

const CompanyCodePage = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [companyCode, setCompanyCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fadeOutTextTimer = setTimeout(() => {
      setFadeOutText(true);
    }, 2000);

    const showFormTimer = setTimeout(() => {
      setShowLogo(false);
    }, 4000);

    return () => {
      clearTimeout(fadeOutTextTimer);
      clearTimeout(showFormTimer);
    };
  }, []);

  const handleCodeSubmit = () => {
    router.push('/auth/login'); // Always navigate to the next page
  };

  if (showLogo) {
    return <Logo />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black'
      }}
    >
      <TextField
        label="Company Code"
        variant="outlined"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
        sx={{
          mb: 2,
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          }
        }}
      />
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        onClick={handleCodeSubmit}
        sx={{
          color: 'white',
          backgroundColor: 'grey',
          '&:hover': {
            backgroundColor: 'darkgrey',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CompanyCodePage;
