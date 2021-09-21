import React, { useEffect, useState } from 'react';
import { ThemeProvider as MuithemeProvidder } from "@material-ui/core/styles";
import theme from './theme/theme';
import Login from './components/security/Login';
// import UserProfile from './components/security/UserProfile';
// import UserRegister from './components/security/UserRegister';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Grid, Snackbar } from '@material-ui/core';
import AppNavbar from './components/navegation/AppNavbar';
import { useStateValue } from './context/store'
import { getCurrentUser } from './actions/UserAction';
import RouteSecure from './components/navegation/bar/RouteSecure';
import NewEmployee from './components/employees/NewEmployee';
import PaginatorEmployee from './components/employees/PaginatorEmployee';
import PaginatorDepartment from './components/departments/PaginatorDepartment';
import EditEmployee from './components/employees/updateEmployee';

function App() {
  const [{ userSession, openSnackbar }, dispatch] = useStateValue();

  const [initialApp, setInitialApp] = useState(false);

  useEffect(() => {

    if (!initialApp) {
      setInitialApp(true);
      // getCurrentUser(dispatch).then(response => {
      //   setInitialApp(true);
      // }).catch(error => {
      //   setInitialApp(true);
      // });
    }
  }, [initialApp]);
  return initialApp === false ? null : (
    <React.Fragment>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: "center" }} open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={<span id="message-id">{openSnackbar ? openSnackbar.message : ''}</span>}
        onClose={() =>
          dispatch({
            type: 'OPEN_SNACKBAR',
            openMessage: {
              open: false,
              message: ''
            }
          })
        }
      >

      </Snackbar>
      <Router>
        <MuithemeProvidder theme={theme}>
          <AppNavbar></AppNavbar>
          <Grid container>
            <Switch>
              <Route exact path='/auth/login' component={Login} />
              <RouteSecure exact path="/" component={PaginatorEmployee} />
              <RouteSecure exact path="/employee/new" component={NewEmployee} />
              <RouteSecure exact path="/employee" component={PaginatorEmployee} />
              <RouteSecure exact path="/employee/:employeeId" component={NewEmployee} />
              <RouteSecure exact path="/department" component={PaginatorDepartment} />
              <RouteSecure exact path="/department/employee/:departmentID" component={PaginatorEmployee}/>
            </Switch>
          </Grid>
        </MuithemeProvidder>
      </Router>
    </React.Fragment>
  );
}

export default App;
