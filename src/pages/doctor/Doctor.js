import {useAtom} from 'jotai';
import { useState,useEffect } from 'react';
import { Link as RouterLink,Outlet ,useNavigate} from 'react-router-dom';
// material
import {  Button, Container, Stack, TextField } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import {patientIdAtom,patientOriginalIdAtom,loginData} from '../../App'
import axios from '../../utils/axios';
// config
import { TEMP_TOKEN } from '../../config';

export default function Doctor() {
  const navigate = useNavigate();
  const [patientId,setPatientId] = useAtom(patientIdAtom);
  const [logindata,setLogindata] = useAtom(loginData);
  const [patinetOriId,setPatientOriId] = useAtom(patientOriginalIdAtom)
  const [searchVal,setSearchVal] = useState('')
  const [clickButton,setClickedButton] = useState('')
  const find = (e)=>{
    if(e.target.value === ""){
      setPatientId("")
      navigate('/dashboard/doctor', { replace: true });
    }
    setSearchVal(e.target.value)
  }

  useEffect(() => {
    
      if(logindata?.userType === 'PATIENT'){
        setPatientId(11)
        // setPatientOriId(2)
      }
      
    
  }, [logindata]);

  const findPerson = async ()=>{
    setPatientId("")
    if(searchVal !== ""){
      // axios start
      
      try{
        const response = await axios.get(`auth/getPatient/${searchVal}`);
      console.log(response.data)

      setPatientId(response.data.patientId)
      setPatientOriId(searchVal)
      // setPatientId(response.data)
      // navigate('/dashboard', { replace: true });
    }catch(e){
      console.log(e)
      alert(e)
    }
    navigate('/dashboard/doctor', { replace: true });
      // axios end
      
    }
  }


  const clickedButton = (btn)=>{
    setClickedButton(btn)
  }
  return (
    <Page title="Dashboard: Blog">
      <Container>
        {logindata.userType === "PATIENT" ? '':
          <Stack direction="row" space={2}>
          <TextField id="outlined-basic" label="Find Patient by Id" variant="outlined" onChange={find} />
          <Button variant="contained" onClick={findPerson}>Find</Button>
        </Stack>
        }
        {
          patientId === "" ? null : 
          <Stack direction="row" alignItems="center"  mb={5} mt={5} spacing={2}>
            
            PHID {patientId}
            {/* <Button variant="contained" component={RouterLink} to="">
              Dashboard
            </Button> */}
            <Button variant="contained" disabled={clickButton === "demographic" } component={RouterLink} to="demographic" onClick={()=>clickedButton('demographic')}>
              Demographic
            </Button>
            {/* //show only for doctor */}
            {logindata.userType === "DOCTOR" || logindata.userType === "PATIENT" ? 
              <>
              <Button variant="contained" component={RouterLink} disabled={clickButton === "diagnoses" } to="diagnoses" onClick={()=>clickedButton('diagnoses')}>
                Diagnoses
              </Button>
              <Button variant="contained" component={RouterLink} disabled={clickButton === "vaccines" } to="vaccines" onClick={()=>clickedButton('vaccines')}>
                Vaccines
              </Button>
              <Button variant="contained" component={RouterLink} disabled={clickButton === "allergies" } to="allergies" onClick={()=>clickedButton('allergies')}>
                Allergies
              </Button>
              </>
            :
            ''
            }

            { 
            logindata.userType === "DOCTOR" || logindata.userType === "PATHOLOGIST" || logindata.userType === "PATIENT" ?
            <Button variant="contained" component={RouterLink} disabled={clickButton === "labtests" } to="labtests" onClick={()=>clickedButton('labtests')}>
              Lab Tests
            </Button>
            :
            null
            }

          { 
            logindata.userType === "PATHOLOGIST"  ?
            <Button variant="contained" component={RouterLink} disabled={clickButton === "orders" } to="orders" onClick={()=>clickedButton('orders')}>
              Orders
            </Button>
            :
            null
            }


{ 
            logindata.userType === "RADIOGRAPHER"  ?
            <Button variant="contained" component={RouterLink} disabled={clickButton === "referrals" } to="referrals" onClick={()=>clickedButton('referrals')}>
              Referrals
            </Button>
            :
            null
            }

            { 
            logindata.userType === "DOCTOR" || logindata.userType === "RADIOGRAPHER" || logindata.userType === "PATIENT" ? 
            <Button variant="contained" component={RouterLink} disabled={clickButton === "scans" } to="scans" onClick={()=>clickedButton('scans')}>
              Scans
            </Button>
            :
            null
            }

            { 
            logindata.userType === "DOCTOR" || logindata.userType === "PHARMACIST" || logindata.userType === "PATIENT" ? 
            <Button variant="contained" component={RouterLink} disabled={clickButton === "prescriptions" } to="prescriptions" onClick={()=>clickedButton('prescriptions')}>
              Prescriptions
            </Button>
            :
            null
            }
        </Stack>
        }
        
      </Container>
      <Outlet />
    </Page>
  );
}
