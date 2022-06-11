import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import trashIcon from '../icons/trash/Frame 36933.png';

import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {Grid, NativeSelect, FormControl, FormGroup, createTheme,ThemeProvider } from '@mui/material';
import axios from 'axios'
// function createData(channels, customer, orderNum, date, status,total) {
//     return {
//         channels,
//         customer,
//         orderNum,
//         date,
//         status,
//         total
//     };
// }
//
// const rows = [
//     createData('Cupcake', 305, 3.7, '04 - 10 - 2021', 4.3, 4.3),
//     createData('Donut', 452, 25.0, '04 - 10 - 2021', 4.9, 4.3),
//     createData('Eclair', 262, 16.0, '04 - 10 - 2021', 6.0, 4.3),
//     createData('Frozen yoghurt', 159, 6.0, '04 - 10 - 2021', 4.0, 4.3),
//     createData('Gingerbread', 356, 16.0, '04 - 10 - 2021', 3.9, 4.3),
//     createData('Honeycomb', 408, 3.2, '04 - 10 - 2021', 6.5, 4.3),
//     createData('Ice cream sandwich', 237, 9.0, '04 - 10 - 2021', 4.3, 4.3),
//     createData('Jelly Bean', 375, 0.0, '04 - 10 - 2021', 0.0, 4.3),
//     createData('KitKat', 518, 26.0, '04 - 10 - 2021', 7.0, 4.3),
//     createData('Lollipop', 392, 0.2, '04 - 10 - 2021', 0.0, 4.3),
//     createData('Marshmallow', 318, 0, '04 - 10 - 2021', 2.0, 4.3),
//     createData('Nougat', 360, 19.0, '04 - 10 - 2021', 37.0, 4.3),
//     createData('Oreo', 437, 18.0, '04 - 10 - 2021', 4.0, 4.3),
// ];
// console.log('roes',rows)
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'channels',
        numeric: false,
        disablePadding: false,
        label: 'Channels',
    },
    {
        id: 'customer',
        numeric: true,
        disablePadding: false,
        label: 'Customer',
    },
    {
        id: 'orderNum',
        numeric: true,
        disablePadding: false,
        label: 'Order Number',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox">

                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const _axios=(apiUrl,method,body)=>{
   return axios({
        url:process.env.REACT_APP_BASE_URL+apiUrl+process.env.REACT_APP_COLLECTION_ID,
        method:method,
        headers: {'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN},
        data:body

    }).catch(err=>{
        console.log('err',err)
   })
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [destinationList, setDestinationList] = React.useState([]);
    const [statusList, setStatusList] = React.useState([]);
    const [typeList, setTypeList] = React.useState([]);
    const [sortByList, setSortByList] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filters, setFilters] = React.useState({searchText:'',category:{},destination:{},status:{},type:{},sortBy:{}});
    // const [filterList, setFilterList] = React.useState({category:[],destination:[],status:[],type:[],sortBy:[]});
    const editOrderList=(data)=>{
        const mData=data.map(x=>({
            ...x,
            channels:x.channelName,
            customer:x.customerFullName,
            orderNum:x.orderNumber,
            status:x.orderStatusName,
            total:x.totalAmount
        }))
        setRows(mData)
    }
    const [rows,setRows]=React.useState([])
    React.useEffect(  () => {
        // Update the document title using the browser API
        console.log('process.env.BASE_URL',process.env.REACT_APP_BASE_URL)
        _axios('/api/Order/GetCollectionOrders/','get')
           .then(res=>{
            console.log('res',res)
            editOrderList(res.data.data)

        })
        _axios('/api/Order/GetOrderListData/','get')
            .then(res=>{
                console.log('GetOrderListData',res.data.data)
                setDestinationList(res.data.data.destination)
                setStatusList(res.data.data.status)
                setTypeList(res.data.data.type)
                setSortByList(res.data.data.sortBy)
                // setFilterList(res.data.data)

            })
        // Promise.all([pOrderList,pFilterList])
        // console.log('filterList',filterList)
    },[]);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.channels);
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
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleFilterChange = (event, name) => {

        console.log('event',event.target.value)
        setFilters({...filters,[name]:event.target.value});
        console.log('filters',filters)
        _axios('/api/Order/FilterOrderList/','post',filters)
            .then(res=>{
                console.log('FilterOrderList',res)
                editOrderList(res.data.data)

            })
    };
    const handelDeleteRow = ( row,index) => {


        console.log('index',index)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const theme = createTheme();
    theme.typography.smallFont={
        fontSize: '12px',
        fontWeight:'bold'
    };
    return (
        <ThemeProvider theme={theme}>

        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/*<EnhancedTableToolbar numSelected={selected.length} />*/}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id="input-with-icon-textfield"
                            variant="filled"
                            label=""
                            fullWidth
                            placeholder="search order"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                            <FormGroup row spacing={2}>
                                <FormControlLabel
                                    value="top"
                                    fontWeight="fontWeightBold"
                                    label={<Typography variant="smallFont"   color="black">Category :</Typography>}

                                    control={<NativeSelect
                                        defaultValue={30}
                                        onChange={(event)=>handleFilterChange(event,'category')}
                                    >


                                    </NativeSelect>}
                                    labelPlacement="start"
                                />

                            </FormGroup>

                    </Grid>
                    <Grid item xs={12} md={2}>
                            <FormGroup row spacing={2}>
                                <FormControlLabel
                                    value="top"
                                    fontWeight="fontWeightBold"
                                    label={<Typography variant="smallFont"   color="black">Destination :</Typography>}

                                    control={<NativeSelect
                                        defaultValue={30}
                                        onChange={(event)=>handleFilterChange(event,'destination')}

                                    >
                                        {
                                            destinationList.map(x=>{
                                                return (<option value={x.id}>{x.name}</option>)

                                            })
                                        }

                                    </NativeSelect>}
                                    labelPlacement="start"
                                />

                            </FormGroup>

                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormGroup row spacing={2}>
                            <FormControlLabel
                                value="top"
                                fontWeight="fontWeightBold"
                                label={<Typography variant="smallFont"   color="black">Status :</Typography>}

                                control={<NativeSelect
                                    defaultValue={30}
                                    onChange={(event)=>handleFilterChange(event,'status')}

                                >
                                    {
                                        statusList.map(x=>{
                                            return (<option value={x.id}>{x.name}</option>)

                                        })
                                    }

                                </NativeSelect>}
                                labelPlacement="start"
                            />

                        </FormGroup>

                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormGroup row spacing={2}>
                            <FormControlLabel
                                value="top"
                                fontWeight="fontWeightBold"
                                label={<Typography variant="smallFont"   color="black">Type :</Typography>}

                                control={<NativeSelect
                                    defaultValue={30}
                                    onChange={(event)=>handleFilterChange(event,'type')}

                                >
                                    {
                                        typeList.map(x=>{
                                            return (<option value={x.id}>{x.name}</option>)

                                        })
                                    }

                                </NativeSelect>}
                                labelPlacement="start"
                            />

                        </FormGroup>

                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormGroup row spacing={2}>
                            <FormControlLabel
                                value="top"
                                fontWeight="fontWeightBold"
                                label={<Typography variant="smallFont"   color="black">Sort by :</Typography>}

                                control={<NativeSelect
                                    defaultValue={30}
                                    onChange={(event)=>handleFilterChange(event,'sortBy')}

                                >
                                    {
                                        sortByList.map(x=>{
                                            return (<option value={x.id}>{x.name}</option>)

                                        })
                                    }

                                </NativeSelect>}
                                labelPlacement="start"
                            />

                        </FormGroup>

                    </Grid>



                </Grid>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {
                                stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.channels);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.channels)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.channels}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.channels}
                                            </TableCell>
                                            <TableCell align="left">{row.customer}</TableCell>
                                            <TableCell align="left">{row.orderNum}</TableCell>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="left">{row.status}</TableCell>
                                            <TableCell align="left">{row.total}</TableCell>
                                            <TableCell align="left">
                                                <label htmlFor="icon-button">
                                                    <IconButton
                                                        onClick={() => handelDeleteRow(row,index)}
                                                        color="primary" aria-label="upload picture" component="span">
                                                        <img src = {trashIcon} alt='something'/>
                                                    </IconButton>
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/*<FormControlLabel*/}
            {/*    control={<Switch checked={dense} onChange={handleChangeDense} />}*/}
            {/*    label="Dense padding"*/}
            {/*/>*/}
        </Box>
        </ThemeProvider>
    );
}
