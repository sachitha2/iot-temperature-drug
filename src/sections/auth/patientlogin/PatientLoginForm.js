import * as Yup from 'yup';
import {useAtom} from 'jotai';
import { useState } from 'react';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import {loginData,patientOriginalIdAtom} from '../../../App'
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    patientNumber: Yup.string().required('PHID is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    patientNumber: '2',
    password: 'patient123',
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
  const [logindata,setLoginData] = useAtom(loginData);
  const [patinetOriId,setPatientOriId] = useAtom(patientOriginalIdAtom)
  const onSubmit = async (values) => {
    // TODO axios here
    console.log(values)

    try{
        const response = await axios.post('auth/patientlogin',{
        patientNumber: values.patientNumber,
        password: values.password
      });
      
      console.log(response.data)
      setLoginData(response.data)
      setPatientOriId(values.patientNumber)
      navigate('/dashboard/doctor', { replace: true });
    }catch(e){
      console.log(e)
      setPatientOriId("")
      alert(e)
    }
    // navigate('/dashboard/doctor', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="patientNumber" label="PHID" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/login_stage">
          Change Role
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
