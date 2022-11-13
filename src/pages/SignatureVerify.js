import * as Yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { DB } from "../firebase";
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField } from '../components/hook-form';
import axios from '../utils/axios';
// material

export default function SignatureVerify() {
  const LoginSchema = Yup.object().shape({
    pid: Yup.string().required('Email is required')
  });

  const defaultValues = {
    pid: ''
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (values) => {
    var temp = 0;
    try {
      // const response = await axios.get(`http://192.168.205.130/`
      const response = await axios.get(`https://api.npoint.io/46e69e6d6546aba07194`
      );
      console.log(response.data)
      temp = response.data.temperature;


    } catch (error) {
      console.log(error);
    }

    if(temp != null){

    

    try {
      // 

      
      await setDoc(doc(DB, "packages",values.pid), {
        pid: values.pid,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", values.pid);

      const docRefTemp = await addDoc(collection(DB, `packages/${values.pid}/temp`), {
        temp: temp
      });

      console.log("Document written with ID: ", docRefTemp);
    } catch (e) {
      alert(e)
      console.error("Error adding document: ", e);
    }
  }
  };

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container xs={6} spacing={3}>
        <Grid item xs={12} spacing={3} padding={3}>
          <Typography variant="h3" gutterBottom>
            Scan a Package
          </Typography>
          <RHFTextField
            // disabled
            required
            name="pid"
            label="PID"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          
          
        </Grid>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Scan Package Temperature
        </LoadingButton>
      </Grid>
      
      </FormProvider>
    </>
  );
}