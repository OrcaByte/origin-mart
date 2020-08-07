import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './pages/Homepage'
import Login from './pages/Login'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SignupPage from './pages/Signup'
import InernalErrorEventHandler from './pages/InernalErrorEventHandler';
import { globalTheme } from './common/Theming';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles'

function App() {
  return (
    <>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={globalTheme} >
          <Router>
            <InernalErrorEventHandler />
            <Switch>
              <Route exact component={Login} path="/login" />
              <Route component={SignupPage} path="/signup" />
              <Route exact component={HomePage} path="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
