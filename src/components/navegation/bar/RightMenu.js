import { Avatar, Link, List, ListItem, ListItemText } from '@material-ui/core';
import react from 'react';
import UserPictureTem from '../../../logo.svg';

export const RightMenu = ({
    classes,
    user,
    logOut
}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button>
                <Avatar src={user.profilePicture || UserPictureTem} />
                <ListItemText classes={{ primary: classes.ListItemText }} primary={user ? user.fullName : ''} />
            </ListItem>
            <ListItem component={Link} button onClick={logOut}>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="LogOut" />
            </ListItem>
        </List>
    </div>
);