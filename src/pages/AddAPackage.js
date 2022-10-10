import * as Yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../components/hook-form';
import { loginData } from '../App';
import axios from '../utils/axios';
// material

export default function AddPatient() {
  const [logindata,setLoginData] = useAtom(loginData);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    nic: '',
    title: '',
    dob: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    maritalStatus: '',
    gender: '',
    religion: '',
    nationality: '',
    childrenCount: 0,
    race: '',
    languages: '',
    address: '',
    occupation: '',
    contactNo: '',
    secondaryContactNo: '',
    emergencyName: '',
    relationShip: '',
    emergencyContactNo: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const [patientId, setPatientId] = useAtom(loginData);
  const [navId, setNavId] = useState('');
  const onSubmit = async (values) => {
    // TODO axios here
    console.log(values);
    try {
      const response = await axios.post(`auth/register/`, {
        nic: values.nic,
        title: values.title,
        dob: values.dob,
        firstName: values.firstname,
        middleName: values.middlename,
        lastName: values.lastname,
        email: values.email,
        maritalStatus: values.maritalStatus,
        gender: values.gender,
        religion: values.religion,
        nationality: values.nationality,
        childrenCount: values.childrenCount,
        race: values.race,
        languages: values.languages,
        address: values.address,
        occupation: values.occupation,
        contactNo: values.contactNo,
        secondaryContactNo: values.secondaryContactNo,
        emergencyName: values.emergencyName,
        relationShip: values.relationShip,
        emergencyContactNo: values.emergencyContactNo,
      },
      {
        headers: {
          Authorization: `Bearer ${logindata.token}`
        }
      }
      );

      console.log(response.data);
      // setPatientId(response.data);
      const test = localStorage.getItem('Doctor');
      // navigate(`/dashboard/${test}`, { replace: true });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container xs={6} spacing={3}>
        <Grid item xs={12} spacing={3} padding={3}>
          <Typography variant="h3" gutterBottom>
            Add a Package
          </Typography>
          <TextField
            // disabled
            required
            id="pid"
            name="Package ID"
            label="PID"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField required id="nic" name="nic" label="Package Name" fullWidth autoComplete="given-name" variant="standard" />
          <TextField type="date" fullWidth id="date" label="Package Dispatched Date"  variant="standard" />
          
          
        </Grid>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Save Package Details
        </LoadingButton>
      </Grid>
      
      </FormProvider>
    </>
  );
}