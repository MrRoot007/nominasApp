import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const LeftMenu = ({ classes }) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/profile">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Profile" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/employee/new">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="New Employee" />
            </ListItem>
            <ListItem component={Link} button to="/employee">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="List Employee" />
            </ListItem>
            <ListItem component={Link} button to="/department">
                <i className="material-icons">house</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="List Department" />
            </ListItem>
        </List>
        <Divider />
    </div>
)