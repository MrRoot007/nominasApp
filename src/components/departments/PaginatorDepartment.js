import React, { useEffect, useState } from 'react';
import { getDepartments } from '../../actions/DepartmentAction';
import { Grid, Hidden, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import ControlTyping from '../Tool/ControlTyping';
import { Link } from 'react-router-dom';

const PaginatorDepartment = (props) => {
    
    const [textSearchDepartment, setTextSearchDepartment] = useState('');
    const typingSearchText = ControlTyping(textSearchDepartment, 900);

    const [paginatorRequest, setPaginatorRequest] = useState({
        Title: '',
        PageNumber: 0,
        QuantityItem: 5
    })
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
        
        const getListDepartment = async () => {
            const response = await getDepartments();
            setPaginatorResponse(response.data);
        }
        getListDepartment();

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
                        name="txtSearchDepartment"
                        variant="outlined"
                        label="Search Department"
                        onChange={e => setTextSearchDepartment(e.target.value)}
                    />
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Department</TableCell>
                            <Hidden mdDown>
                                <TableCell align="left">Action</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatorResponse.data.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell align="left">{department.sName}</TableCell>
                                <TableCell align="left" component={Link} button to={`/department/employee/${department.id}`}>
                                    Detail
                                </TableCell>
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
                labelRowsPerPage="Department per page"
            />
        </div>
    );
};

export default PaginatorDepartment;