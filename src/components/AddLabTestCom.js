import React from 'react'
import * as Yup from 'yup';
import {useAtom} from 'jotai';
// material
import {
    Stack,
    Button,
    Typography
  } from '@mui/material';

  import { useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';

import axios from '../utils/axios';


import {loginData,patientIdAtom} from '../App'


import { FormProvider,RHFTextField } from './hook-form';




export default function AddLabTestCom() {

    const [logindata,setLoginData] = useAtom(loginData);
    const [patientId,setPatientId] = useAtom(patientIdAtom);
    

// form start
const LoginSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    fileLocation: Yup.string().required('fileLocation is required'),
  });

  const defaultValues = {
    date: '',
    fileLocation: '',
    doctor: logindata.id,
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
  // const [patientId,setPatientId] = useAtom(loginData);
  const onSubmit = async (values) => {
    // TODO axios here
    console.log(logindata.id)
    try{
        const response = await axios.post('labtest',{
          date:values.date, 
          fileLocation:values.fileLocation, 
          doctor:logindata.id, 
          patient:patientId
      },{
        headers: {
          Authorization: `Bearer ${logindata.token}`
        }
      });
      console.log(response.data)
      alert('done')
      // setPatientId(response.data)
      // navigate('/dashboard', { replace: true });
    }catch(e){
      console.log(e)
      alert(e)
    }
  };
  // form end

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Add Lab Test
              </Typography>
              <RHFTextField disabled fullWidth name="doctor"  variant="outlined"/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Date
              </Typography>
              <RHFTextField type="date" fullWidth name="date"  variant="outlined" />

              <Typography id="modal-modal-title" variant="h3" component="h2">
                Lab Test file url
              </Typography>
              <RHFTextField type="text" multiline rows={4} fullWidth name="fileLocation"  label="File url" variant="outlined" />
              <Button variant="contained" type="submit">Save</Button>
              </Stack>
    </FormProvider>
  )
}
