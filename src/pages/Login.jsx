import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Button,
  Divider,
  Grid,
  Box,
} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AppIcon, { MedIcon } from '../common/AppIcon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CallIcon from '@material-ui/icons/Call';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LoginBgImg from '../assets/images/login-background.jpg';
import { TextFieldInput } from '../common/SearchInput';
import Axios from '../utils/axiosBase';
import { useHistory } from 'react-router-dom';
import { setPersistStorage } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${LoginBgImg})`,
    backgroundSize: 'cover',
  },
  paper: {
    maxWidth: 375,
    width: '90vw',
    backgroundColor: 'rgb(247,247,247)',
  },
  heading: {
    textShadow: '1px 1px 4px rgb(143 125 125)',
    color: 'rgb(0,123,211)',
  },
  bgTransParent: {
    background: '#00000040',
  },
}));

export default function Login() {
  const classes = useStyles();
  const [loginForm, setLoginForm] = React.useState({
  });
  const [inputType, setInputType] = React.useState('password');
  const history = useHistory();

  const login = () => {
    console.log(loginForm);
    Axios.post('shop/login', loginForm).subscribe((res) => {
      setPersistStorage(res);
      console.log(res);
      Axios.refreshHeader();
      history.replace('/');
    });
  };

  return (
    <Box className={`${classes.root}`}>
      <Grid
        container
        className={`${classes.bgTransParent} sm:justify-center md:justify-around h-full`}
        alignItems="center"
      >
        <Grid item className="self-start mt-4 md:mt-20" xs={12} sm={6} md={6}>
          <h2
            className={`${classes.heading} text-2xl sm:text-6xl text-center font-medium`}
          >
            Homecare Network
          </h2>
        </Grid>
        <Grid className="sm:block flex justify-center" item xs={12} sm="auto">
          <Paper
            className={`${classes.paper} flex flex-col items-center p-7 mt-4`}
          >
            <AppIcon />

            <div className="my-2" />

            {/* <Typography className="mt-4" align="center" variant="h6">
              Login
            </Typography> */}

            <TextFieldInput
              className="pl-3 py-1 rounded-sm border-solid border border-gray-400 w-full"
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon className="text-gray-500" />
                </InputAdornment>
              }
              placeholder="Username or Email"
              cb={(fname, value) => {
                setLoginForm({ ...loginForm, email: value });
              }}
            />

            <TextFieldInput
              className="pl-3 py-1 rounded-sm border-solid border border-gray-400 w-full"
              type={inputType}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon className="text-gray-500" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    onClick={() =>
                      setInputType(inputType === 'text' ? 'password' : 'text')
                    }
                    size="small"
                  >
                    {inputType === 'text' ? (
                      <VisibilityIcon className="text-gray-800" />
                    ) : (
                      <VisibilityOffIcon className="text-gray-500" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Password"
              cb={(fname, value) => {
                setLoginForm({ ...loginForm, password: value });
              }}
            />

            <Button
              className="w-full mt-4"
              variant="contained"
              color="primary"
              disableElevation
              onClick={login}
            >
              Login
            </Button>

            <div className="flex mb-4 mt-5 w-full justify-between items-center">
              <Link
                component="button"
                variant="body2"
                className="underline text-sm text-green-600 font-medium"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                Forgot Password?
              </Link>

              <div className="flex justify-center items-center">
                <Typography className="mr-2 text-sm font-medium text-gray-600">
                  New User?
                </Typography>

                <Link
                  component="button"
                  variant="body2"
                  className="my-2 font-medium"
                  onClick={() => history.replace('/signup')}
                >
                  Register?
                </Link>
              </div>
            </div>

            <Divider flexItem style={{ height: 1 }} />
            <div className="flex items-center mt-5">
              <Typography className="text-sm font-medium">
                Contact Ozone:{' '}
              </Typography>
              <CallIcon className="ml-3 mr-1 text-sm text-green-600" />
              <Link href="tel:04022108108">0 4022108108</Link>
            </div>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="bg-white self-end my-4"
          justify="center"
          alignItems="center"
          style={{ height: 70 }}
          xs={12}
          md={12}
        >
          <Typography className="italic mr-4 font-medium">
            Powered by
          </Typography>
          <MedIcon />
        </Grid>
      </Grid>
    </Box>
  );
}
