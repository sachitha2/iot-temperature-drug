import * as Yup from 'yup';
import {useAtom} from 'jotai';
import { useState } from 'react';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { AUTH } from "../../../firebase";
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// eslint-disable-next-line import/named
import {loginData} from '../../../App'
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    // phid: Yup.string().required('PHID is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    // phid: '',
    email: 'samwilson@gmail.com',
    password: '12345678',
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
  const onSubmit = async (values) => {
    // TODO axios here
    console.log(values)
    signInWithEmailAndPassword(AUTH, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/dashboard', { replace: true });
    console.log(userCredential);
    const logData  = {id:userCredential.user.id,token:userCredential.user.id,userType:'ADMIN'}
    setLoginData(logData)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message);
  });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <RHFTextField name="phid" label="PHID" /> */}
        <RHFTextField name="email" label="Email address" />

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
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/register">
          Register
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
