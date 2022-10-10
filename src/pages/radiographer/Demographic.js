import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
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

export default function User() {
  return (
    <>
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
          <TextField
            disabled
            required
            id="nic"
            name="nic"
            label="NIC"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField disabled type="date" fullWidth id="date" variant="standard" />
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
            required
            id="firstname"
            name="firstname"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="middlename"
            name="middlename"
            label="Middle Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="gender"
            name="gender"
            label="Gender"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="occupation"
            name="occupation"
            label="Occupation"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="maritalstatus"
            name="maritalstatus"
            label="Marital Status"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="children"
            name="children"
            label="Children"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="religion"
            name="religion"
            label="Religion"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="nationality"
            name="nationality"
            label="Nationality"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="race"
            name="race"
            label="Race"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
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
            disabled
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
            disabled
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="phone2"
            name="phone2"
            label="Phone2"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            disabled
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}

