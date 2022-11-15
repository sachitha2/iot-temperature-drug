import * as Yup from 'yup';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 
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
import { async } from '@firebase/util';
// material


export default function SignatureVerify() {

  const [imageSrc,setImageSrc] = useState(null);
  const [result,setResult] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

  const encodeImageFileAsURL = (file)=> {
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      setImageSrc(reader.result)
    }
    return reader.readAsDataURL(file);
  }

  const onChange = async (e) => {
    let url = "http://35.195.248.108:8000/signature-validate";
    let file = e.target.files[0];
    let imageData =await encodeImageFileAsURL(file)
    console.log(imageData)
    setImageSrc(imageData)
    setResult("")
    uploadFile(url, file);
  };

  const uploadFile = (url, file) => {
    setIsLoading(true)
    let formData = new FormData();
    formData.append("file", file);
    axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response.data)
        setIsLoading(false)
        const myArray = response.data.message.result.split(" ");
        setResult(myArray[1])
        // setImageSrc(response.data.message.image)
        // setItemList(dataSet)
        // fnSuccess(response);
      }).catch((error) => {
        setIsLoading(false)
        console.log(error)
        setResult("Error")
        // fnFail(error);
      });
    };

  return (
    <>
    <input type="file" onChange={onChange} accept ="image/*"/>
    {isLoading ? <CircularProgress /> : null}
    
    <h1>{result}</h1>
    {
      imageSrc != null ? 
      <img src={imageSrc} alt="sam" style={{"width":"500px","height":"600px"}}/>
      :
      null
    }

    {imageSrc}
    </>
  );
}