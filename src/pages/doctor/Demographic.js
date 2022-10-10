import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useAtom} from 'jotai';
import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
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
} from '@mui/material';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------
import {loginData,patientIdAtom,patientOriginalIdAtom} from '../../App'

export default function User() {
  const [logindata,setLoginData] = useAtom(loginData);
  const [patientId,setPatientId] = useAtom(patientIdAtom);
  const [patinetOriId,setPatientOriId] = useAtom(patientOriginalIdAtom)
  const [dataRes,setDataRes] = useState({
    nic:'',
    dob:'',
    firstName:'',
    middleName:'',
    lastName:'',
    gender:'',
    occupation:'',
    martialStatus:'',
    childrenCount:'',
    religion:'',
    nationality:'',
    race:'',
    languages:'',
    address:'',
    contactNo:'',
    secondaryContactNo:'',
    email:''
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`auth/getPatient/${patinetOriId}`,
        {
          headers: {
            Authorization: `Bearer ${logindata.token}`
          }
        }
        );
        setDataRes(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  // TODO demographic edit
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} sm={6}>
          <Typography variant="h3" gutterBottom>
            General Information
          </Typography>
          <TextField
            disabled
            id="phid"
            value={patientId}
            name="phid"
            label="PHID"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            id="nic"
            name="nic"
            label="NIC"
            value={dataRes?.nic}
            fullWidth
            variant="standard"
          />
          <TextField disabled label="DOB" value={dataRes?.dob} type="date" fullWidth id="date" variant="standard" />
          <TextField
            disabled
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            id="firstname"
            name="firstname"
            label="First Name"
            fullWidth
            value={dataRes?.firstName}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="middlename"
            name="middlename"
            label="Middle Name"
            fullWidth
            value={dataRes?.middleName}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            value={dataRes?.lastName}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            value={dataRes?.gender}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            value={dataRes?.occupation}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="maritalstatus"
            name="maritalstatus"
            label="Marital Status"
            fullWidth
            value={dataRes?.martialStatus}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="children"
            name="children"
            label="Children"
            fullWidth
            value={dataRes?.childrenCount}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="religion"
            name="religion"
            label="Religion"
            fullWidth
            value={dataRes?.religion}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="nationality"
            name="nationality"
            label="Nationality"
            fullWidth
            value={dataRes?.nationality}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="race"
            name="race"
            label="Race"
            fullWidth
            value={dataRes?.race}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="languages"
            name="languages"
            label="Languages"
            fullWidth
            value={dataRes?.languages}
            variant="standard"
          />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Typography variant="h3" gutterBottom>
            Address and Contact Details
          </Typography>
          <TextField
            disabled
            type="text"
            value={dataRes?.address}
            multiline
            rows={3}
            fullWidth
            id="address"
            name="address"
            label="Address"
            variant="outlined"
          />
          <TextField
            disabled
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            value={dataRes?.contactNo}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="phone2"
            name="phone2"
            label="Phone2"
            fullWidth
            value={dataRes?.secondaryContactNo}
            variant="standard"
          />
          <TextField
            disabled
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={dataRes?.email}
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}

