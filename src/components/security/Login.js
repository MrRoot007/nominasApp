import React, { useState } from 'react';
import style from '../Tool/Style';
import LockIcon from '@material-ui/icons/Lock';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import { userLogin } from '../../actions/UserAction';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../context/store';

const Login = (props) => {
    const [{ sessionUser }, dispatch] = useStateValue();
    const [user, setUser] = useState({
        User: '',
        Password: ''
    });
    const addValuesMemory = e => {
        const { name, value } = e.target;
        setUser(before => ({
            ...before,
            [name]: value
        }));
    }
    const login = e => {
        e.preventDefault();
        userLogin(user, dispatch).then(response => {
            // console.log(response);
            if (response.status === 200) {
                window.localStorage.setItem('token_security', response.data.token);
                props.history.push("/");
            } else {
                dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMessage: {
                        open: true,
                        message: 'Las credenciales del usuario son incorrectas'
                    }
                });
            }
        }).catch(error => {
            console.log('Ocurrio un error',error);
        })
    }
    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockIcon style={style.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form style={style.form}>
                    <TextField variant="outlined" name="User" value={user.User} onChange={addValuesMemory} label="User" fullWidth margin="normal" />
                    <TextField variant="outlined" name="Password" value={user.Password} onChange={addValuesMemory} type="password" label="Password" fullWidth margin="normal" />
                    <Button type="submit" onClick={login} fullWidth variant="contained" color="primary" style={style.submit}>
                        Enviar
                    </Button>
                </form>
            </div>
        </Container >
    );
};


export default withRouter(Login);