import * as Yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 
import { DataGrid } from '@mui/x-data-grid';
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
  CircularProgress
} from '@mui/material';
import { DB } from "../firebase";
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField } from '../components/hook-form';
import axios from '../utils/axios';
import { set } from 'lodash';
// material


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'itemname', headerName: 'Item Name', width: 130 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

export default function DocScan() {

  const [itemList,setItemList] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const LoginSchema = Yup.object().shape({
    pid: Yup.string().required('Email is required')
  });

  const defaultValues = {
    pid: ''
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
    var temp = 0;
    try {
      // const response = await axios.get(`http://192.168.205.130/`
      const response = await axios.get(`https://api.npoint.io/46e69e6d6546aba07194`
      );
      console.log(response.data)
      temp = response.data.temperature;


    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    let url = "http://35.195.248.108:8000/upload";
    let file = e.target.files[0];
    setIsLoading(true)
    uploadFile(url, file);
  };
  
  const uploadFile = (url, file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        setIsLoading(false)
        console.log(response.data.message)
        var size = Object.keys(response.data.message).length;


        var numData = Object.keys(response.data.message[0]).length;
        let n = 1;
        let dataSet = []
        while(n < numData){
          let dataItem = {}
          dataItem.id = response.data.message[0][n]
          dataItem.itemname = response.data.message[1][n]
          dataItem.amount = response.data.message[2][n]
          console.log(dataItem)
          dataSet.push(dataItem)
          n++
        }

        console.log(dataSet)
        setItemList(dataSet)
        // fnSuccess(response);
      }).catch((error) => {
        setIsLoading(false)
        console.log(error)
        // fnFail(error);
      });
  };
  return (
    <>
    <input type="file" onChange={onChange} accept ="image/*"/>
    {isLoading ? <CircularProgress /> : null}
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={itemList}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    
    </>
  );
}