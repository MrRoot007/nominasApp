import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import style from '../Tool/Style'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';
import { saveEmployee } from '../../actions/EmployeeAction';
import { useStateValue } from '../../context/store';
import { getDepartments } from '../../actions/DepartmentAction';

const UpdateEmployee = () => {
    const [{ sessionUser }, dispatch] = useStateValue();
    const [listOfDeparments, setDepartmentX] = useState({
        data: []
    });
    const [departmentId, setDepartment] = React.useState('0');
    const handleChange = (event) => {
        setDepartment(event.target.value);
    };
    useEffect(() => {
        const getListDepartments = async () => {
            const response = await getDepartments();
            setDepartmentX(response.data);
            console.log(listOfDeparments);
        }
        getListDepartments();
    }, [])

    const [employee, setEmployee] = useState({
        sName: '',
        sLastName: '',
        dSalary: 0,
        sStreet: '',
        iZipCode: '',
        sCity: '',
        sCountry: ''
    });
    const photoKey = uuidv4();
    const resetForm = () => {
        setEmployee({
            sName: '',
            sLastName: '',
            dSalary: 0,
            sStreet: '',
            iZipCode: '',
            sCity: '',
            IIdDepartment: 0,
            sCountry: ''
        })
    }
    const updateEmployeeButton = e => {
        e.preventDefault();
        const employeeId = uuidv4();
        const objectEmployee = {
            SName: employee.sName,
            SLastName: employee.sLastName,
            dSalary: parseFloat(employee.dSalary) || 0,
            sStreet: employee.sStreet,
            iZipCode: employee.iZipCode,
            sCity: employee.sCity,
            IIdDepartment: departmentId,
            sCountry: employee.sCountry
        }
        if (departmentId <= 0) {
            dispatch({
                type: 'OPEN_SNACKBAR',
                openMessage: {
                    open: true,
                    message: 'Debe seleccionar un departamento'
                }
            });
            return;
        }
        saveEmployee(objectEmployee).then(response => {
            const responseEmployee = response[0];
            let message = '';
            debugger
            if (responseEmployee.status === 200) {
                message += 'Empleado guardado, '
                resetForm();
            } else {
                message += 'Error: ' + Object.keys(responseEmployee.data.errors)
            }
            dispatch({
                type: 'OPEN_SNACKBAR',
                openMessage: {
                    open: true,
                    message: message
                }
            })
        }).catch(error => {
            console.log(error);
            debugger
            dispatch({
                type: 'OPEN_SNACKBAR',
                openMessage: {
                    open: true,
                    message: 'Ocurrio un error'
                }
            });
        });
    }

    const addValueMemory = e => {
        const { name, value } = e.target;
        setEmployee((before => ({
            ...before,
            [name]: value
        })));
    }
    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de nuevo empleado
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="sName" value={employee.sName} onChange={addValueMemory} variant="outlined" fullWidth label="Nombres" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField name="sLastName" value={employee.sLastName} onChange={addValueMemory} variant="outlined" fullWidth label="Apellidos" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="dSalary" value={employee.dSalary} onChange={addValueMemory} variant="outlined" fullWidth label="Salario" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="sStreet" value={employee.sStreet} onChange={addValueMemory} variant="outlined" fullWidth label="Calle" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="IIdDepartment"
                                value={departmentId}
                                label="Departamento"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Seleccionar departmento</MenuItem>
                                {listOfDeparments.data.map(function (department) {
                                    return <MenuItem value={department.id}>{department.sName}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="iZipCode" value={employee.iZipCode} onChange={addValueMemory} variant="outlined" fullWidth label="Código postal" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="sCity" value={employee.sCity} onChange={addValueMemory} variant="outlined" fullWidth label="Ciudad" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="sCountry" value={employee.sCountry} onChange={addValueMemory} variant="outlined" fullWidth label="Pais" />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                style={style.submit}
                                onClick={updateEmployeeButton}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
};

export default UpdateEmployee;