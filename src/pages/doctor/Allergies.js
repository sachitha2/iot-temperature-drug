import * as Yup from 'yup';
import { filter } from 'lodash';
import {useAtom} from 'jotai';
import { useState,useEffect } from 'react';
// material
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// form end
import Scrollbar from '../../components/Scrollbar';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';

import SearchNotFound from '../../components/SearchNotFound';
import { FormProvider,RHFTextField } from '../../components/hook-form';
import { UserListHead } from '../../sections/@dashboard/user';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------
import {loginData,patientIdAtom} from '../../App'

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function Allergies() {
  const [logindata,setLoginData] = useAtom(loginData);
  const [patientId,setPatientId] = useAtom(patientIdAtom);
  // alert(logindata.id)
  const [page, setPage] = useState(0);
  const [vaccinesList,setAllergiesList] = useState([{id:1,avatarUrl:`/static/mock-images/avatars/avatar_${1}.jpg`,name:'sachitha hirushan',company:'company',isVerified:false}]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = vaccinesList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vaccinesList.length) : 0;

  const filteredUsers = applySortFilter(vaccinesList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = useState(false);

  // Fetch data start

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`allergy/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${logindata.token}`
          }
        }
        );
        console.log(response.data)
        setAllergiesList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [open]);
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };
  // Fetch data end
  // Modal 
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // form start
  const LoginSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    date: Yup.string().required('Date is required'),
    title: Yup.string().required('Title is required'),
    doctor: Yup.string().required('Doctor id is required'),
  });

  const defaultValues = {
    description: '',
    date: '',
    title: '',
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
  const onSubmit = async (values) => {
    // TODO axios here
    console.log(logindata.id)
    try{
        const response = await axios.post('allergy',{
          tag:"Severe", 
          date:values.date, 
          description:values.description, 
          title:values.title, 
          doctor:logindata.id, 
          patient:patientId
      },{
        headers: {
          Authorization: `Bearer ${logindata.token}`
        }
      });
      setOpen(false)
      console.log(response.data)
      // setPatientId(response.data)
      // navigate('/dashboard', { replace: true });
    }catch(e){
      console.log(e)
      alert(e)
    }
  };
  // form end

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        {logindata.userType === "PATIENT" ? '':
          <Button onClick={handleOpen} variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Allergies
          </Button>
          }
          <div>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Add Allergies
              </Typography>
              <RHFTextField disabled fullWidth name="doctor" id="doctor"  variant="outlined" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Date
              </Typography>
              <RHFTextField type="date" fullWidth name="date"  variant="outlined" />
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Allergies Details
              </Typography>
              
              <RHFTextField type="text" fullWidth name="title"  label="Title" variant="outlined" />
              <RHFTextField type="text" multiline rows={4} fullWidth name="description"  label="Description" variant="outlined" />
              
              <LoadingButton fullWidth size="large" variant="contained" type="submit" loading={isSubmitting}>Save</LoadingButton>
              </Stack>
              </FormProvider>
             
            </Box>
          </Modal>
          
    </div>
        </Stack>

        {/* TABLE start */}
        <Card>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={vaccinesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name,date,title,description } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {date}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{title}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={vaccinesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {/* //TABLE END */}
      </Container>
    </Page>
  );
}