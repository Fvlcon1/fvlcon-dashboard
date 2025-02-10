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
import Form from './components/form';
import { useFormik } from 'formik';
import validationSchema from './utils/validationSchema'
import Agreement from './components/agreement';

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const [showMfa, setShowMfa] = useState(false)
  const [showAgreement, setShowAgreement] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [timer, setTimer] = useState(5*60);

  const formik = useFormik({
      initialValues: {
          companyCode: '',
          email: '',
          password: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        try {
          setError(undefined); // Clear previous errors
          setLoading(true)
      
          const auth = await authrorization({
            email : values.email,
            password : values.password,
            companyCode : values.companyCode,
          })
      
          if (!auth) {
            setError('Invalid email or password');
            message.error('Invalid email or password')
            setLoading(false)
          } else {
            setShowMfa(true)
            setLoading(false)
          }
        } catch (error : any) {
          setError(error.message);
          message.error('Invalid email or password')
          console.log({error})
          setLoading(false)
        }
      }
  })

  const resendHandler = async () => {
    const auth = await authrorization({
      email : formik.values.email,
      password : formik.values.password,
      companyCode : formik.values.companyCode,
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
    try {
      const result = await signIn('credentials', {
        redirect : false,
        email : formik.values.email,
        password : formik.values.password,
        companyCode : formik.values.companyCode,
      })
  
      console.log({result})
      if(!result?.error){
        setShowMfa(false)
        setShowAgreement(true)
      } else {
        message.error("Error signing in")
        console.log(result.error)
      }
    } catch (error) {
      message.error("Error signing in")
      console.log({error})
    }
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
      email={formik.values.email}
      onSuccess={handleMfaSubmit}
      timer={timer}
      setTimer={setTimer}
      resendHandler={resendHandler}
    />
    : showAgreement ?
    <Agreement />
    :
    <Form 
      handleSubmit={formik.handleSubmit}
      formik={formik}
      loading={loading}
      errorMessage={error}
    />
  );
}
