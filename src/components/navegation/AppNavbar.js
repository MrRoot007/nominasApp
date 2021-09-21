import { AppBar } from '@material-ui/core';
import React from 'react';
import { useStateValue } from '../../context/store';
import BarSession from './bar/BarSession';

const AppNavbar = () => {
    const [{ sessionUser }, dispatch] = useStateValue();
    return sessionUser
        ? (sessionUser.authenticated == true ? <AppBar position="static" ><BarSession /></AppBar > : null)
        : null;
};

export default AppNavbar;