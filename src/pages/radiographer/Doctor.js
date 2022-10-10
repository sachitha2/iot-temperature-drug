import {useAtom} from 'jotai';

import { Link as RouterLink,Outlet } from 'react-router-dom';
// material
import {  Button, Container, Stack, TextField } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import {patientIdAtom} from '../../App'

export default function Doctor() {
  const [patientId,setPatientId] = useAtom(patientIdAtom);
  return (
    <Page title="Dashboard: Blog">
      <Container>
        {patientId}
        <TextField id="outlined-basic" label="Find Patient by Id" variant="outlined" />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
            
          
            <Button variant="contained" component={RouterLink} to="">
              Dashboard
            </Button>
            <Button variant="contained" component={RouterLink} to="radiographer-demographic">
              Demographic
            </Button>
            <Button variant="contained" component={RouterLink} to="referrals">
              Referrals
            </Button>
            <Button variant="contained" component={RouterLink} to="radiographer-scans">
              Scans
            </Button>
        </Stack>
      </Container>
      <Outlet />
    </Page>
  );
}
