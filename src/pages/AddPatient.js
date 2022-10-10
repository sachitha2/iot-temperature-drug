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
      <Grid container spacing={3}>
        <Grid item xs={10} sm={6}>
          <Typography variant="h3" gutterBottom>
            General Information
          </Typography>
          <TextField
            disabled
            required
            id="phid"
            name="phid"
            label="PHID"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField required id="nic" name="nic" label="NIC" fullWidth autoComplete="given-name" variant="standard" />
          <TextField type="date" fullWidth id="date" variant="standard" />
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="middlename"
            name="middlename"
            label="Middle Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="maritalstatus"
            name="maritalstatus"
            label="Marital Status"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="children"
            name="children"
            label="Children"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="religion"
            name="religion"
            label="Religion"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="nationality"
            name="nationality"
            label="Nationality"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="race"
            name="race"
            label="Race"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="languages"
            name="languages"
            label="Languages"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Typography variant="h3" gutterBottom>
            Address and Contact Details
          </Typography>
          <TextField
            type="text"
            multiline
            rows={3}
            fullWidth
            id="address"
            name="address"
            label="Address"
            variant="outlined"
          />
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="phone2"
            name="phone2"
            label="Phone2"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <Typography variant="h3" gutterBottom>
            Emergency Contact
          </Typography>
          <TextField
            required
            id="emergencyName"
            name="emergencyName"
            label="Emergency Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="relationShip"
            name="relationShip"
            label="Relationship"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            required
            id="emergencyContactNo"
            name="emergencyContactNo"
            label="Emergency Contact No"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Save Patient
      </LoadingButton>
      </FormProvider>
    </>
  );
}