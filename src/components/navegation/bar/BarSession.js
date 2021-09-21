import {
    Avatar,
    Button,
    Drawer,
    IconButton,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../../context/store';
import UserPictureTem from "../../../logo.svg";
import { LeftMenu } from './LeftMenu';
import { RightMenu } from './RightMenu';

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    list: {
        width: 250
    },
    ListItemText: {
        fontSize: '14px',
        fontWeight: 600,
        paddingLeft: '15px',
        color: '#212121'
    }
}));

const BarSession = (props) => {
    const classes = useStyles();
    const [{ sessionUser }, dispatch] = useStateValue();
    const [openLeftMenu, setOpenMenuLeft] = useState();
    const [openRightMenu, setOpenMenuRight] = useState();

    const closeMenuLeft = () => {
        setOpenMenuLeft(false);
    }
    const closeMenuRight = () => {
        setOpenMenuRight(false);
    }
    const openLeftMenuAction = () => {
        setOpenMenuLeft(true);
    }
    const openRightMenuAction = () => {
        setOpenMenuRight(true);
    }
    const logOut = () => {
        localStorage.removeItem('token_security');
        dispatch({
            type: 'LOG_OUT',
            nuevoUser: null,
            authenticated: false
        })
        props.history.push('/auth/login')
    }
    return (
        <React.Fragment>
            <Drawer
                open={openLeftMenu}
                onClose={closeMenuLeft}
                anchor="left"
            >
                <div className={classes.list} onKeyDown={closeMenuLeft} onClick={closeMenuLeft}>
                    <LeftMenu classes={classes} />
                </div>
            </Drawer>
            <Drawer
                open={openRightMenu}
                onClose={closeMenuRight}
                anchor="right"
            >
                <div className={classes.list} onKeyDown={closeMenuRight} onClick={closeMenuRight}>
                    <RightMenu
                        classes={classes}
                        logOut={logOut}
                        user={sessionUser ? sessionUser.user : null}
                        UserPictureTem={UserPictureTem}
                    />
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={openLeftMenuAction}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography variant="h6">Nominas</Typography>
                <div className={classes.grow}></div>
                <div className={classes.sectionDesktop}>
                    <Button color="inherit" onClick={logOut}>Salir</Button>
                    <Button color="inherit">
                        {sessionUser ? sessionUser.userName : 'sadads'}
                    </Button>
                    <Avatar src={UserPictureTem}></Avatar>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton color="inherit" onClick={openRightMenuAction}>
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>

        </React.Fragment>
    );
};

export default withRouter(BarSession);