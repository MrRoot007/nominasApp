import React, { useEffect, useState } from 'react';
import { paginationEmployee, paginationEmployeeByDepartment } from '../../actions/EmployeeAction';
import { Grid, Hidden, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import ControlTyping from '../Tool/ControlTyping';
// import { Link } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaginatorEmployee = () => {
    const parameters = useParams();
    const [textSearchEmployee, setTextSearchEmployee] = useState('');
    const typingSearchText = ControlTyping(textSearchEmployee, 900);

    const [paginatorRequest, setPaginatorRequest] = useState({
        Title: '',
        PageNumber: 0,
        QuantityItem: 5
    });
    const [paginatorResponse, setPaginatorResponse] = useState({
        data: [],
        totalRecords: 0,
        pagesNumber: 0
    });

    useEffect(() => {
        let titleVariant = '';
        let pageVariant = paginatorRequest.PageNumber + 1;
        if (typingSearchText) {
            titleVariant = typingSearchText;
            pageVariant = 1;
        }
        const objectPaginatorRequest = {
            Title: titleVariant,
            PageNumber: pageVariant,
            QuantityItem: paginatorRequest.QuantityItem
        }

        if (parameters.departmentID) {
            const getListEmployeeDepartment = async () => {
                const response = await paginationEmployeeByDepartment(parameters.departmentID);
                setPaginatorResponse(response.data);
            }
            getListEmployeeDepartment();
        } else {
            const getListEmployee = async () => {
                const response = await paginationEmployee();
                setPaginatorResponse(response.data);
            }
            getListEmployee();
        }
    }, [paginatorRequest, typingSearchText]);

    const changePage = (event, newPage) => {
        setPaginatorRequest((before) => ({
            ...before,
            PageNumber: parseInt(newPage)
        }));
    }
    const changeQuantityRecords = (event) => {
        setPaginatorRequest((before) => ({
            ...before,
            QuantityItem: parseInt(event.target.value),
            PageNumber: 0
        }));
    }
    return (
        <div style={{ padding: "10px", width: "100%" }}>
            <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Grid item xs={12} sm={4} md={6}>
                    <TextField
                        fullWidth
                        name="txtSearchEmployee"
                        variant="outlined"
                        label="Buscar empleado"
                        onChange={e => setTextSearchEmployee(e.target.value)}
                    />
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <Hidden mdDown>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Department</TableCell>
                                <TableCell align="left">Salary</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatorResponse.data.map((empleado) => (
                            <TableRow key={empleado.id}>
                                <TableCell align="left">{empleado.sName}</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="left">{empleado.sLastName}</TableCell>
                                    <TableCell align="left">{empleado.sDepartmentName}</TableCell>
                                    <TableCell align="left">{empleado.dSalary}</TableCell>
                                    <TableCell align="left" component={Link} button to={`/employee/${empleado.id}`}>
                                        Update
                                    </TableCell>
                                </Hidden>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                // count={paginatorResponse.totalRecords}
                count={100}
                rowsPerPage={paginatorRequest.QuantityItem}
                page={paginatorRequest.PageNumber}
                onPageChange={changePage}
                onRowsPerPageChange={changeQuantityRecords}
                labelRowsPerPage="Employee per page"
            />
        </div>
    );
};

export default PaginatorEmployee;