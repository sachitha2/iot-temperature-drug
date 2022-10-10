import * as Yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
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

export default function Packages() {
  const LoginSchema = Yup.object().shape({
    pid: Yup.string().required('Email is required'),
    pkgName: Yup.string().required('Package Name is required'),
  });

  const defaultValues = {
    pid: '',
    pkgName:''
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

    try {
      const docRef = await addDoc(collection(DB, "packages"), {
        pid: values.pid,
        pkgName: values.pkgName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      alert(e)
      console.error("Error adding document: ", e);
    }
    // TODO axios here
    console.log(values);
    
  };

  return (
    <>
     <Grid container xs={6} spacing={3}>
        
       
      </Grid>
    </>
  );
}