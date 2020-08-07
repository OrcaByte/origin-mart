import React from 'react';
import { Grid, Paper, Typography, Button, Link } from '@material-ui/core';
import { genTextFieldInput, emailRegex, isValidForm, setPersistStorage } from '../utils';
import GenFormInputFields from '../common/GenFormInputFields';
import { useHistory } from 'react-router-dom';
import AppIcon from '../common/AppIcon';
import Axios from '../utils/axiosBase';




export default function SignupPage() {
  const history = useHistory();

  const [signupForm, setSignupForm] = React.useState<any>({});
  const shopInfoFormJson = [
    genTextFieldInput('Shop Name', 'Enter Shop Name', 'name'),
    genTextFieldInput(
      'Email ID',
      'Enter email',
      'email',
      (value) => value && emailRegex.test(value)
    ),
    genTextFieldInput(
      'Password',
      'Enter password',
      'password',
      (value) => value && value.length > 3,
      '',
      'password'
    ),
  ];

  const onSubmitForm = () => {
    console.log(signupForm);
    if (
      isValidForm(
        signupForm,
        ...shopInfoFormJson.map((item) => ({
          key: item.formControlName,
          FieldNm: item.label,
        }))
      )
    ) {
        Axios.post('/shop', signupForm).subscribe(res => {
            console.log(res);
            setPersistStorage(res);
            history.replace('/')
        })
    }
  };

  const setSignupFormWrapper = (a: string, b: any) => {
    const tempObj = { ...signupForm };
    tempObj[a] = b;
    setSignupForm(tempObj);
  };

  return (
    <div className="container  h-screen flex justify-center items-center">
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={10} sm={6} md={4}>
          <Paper className="p-4 md:p-6" style={{ height: 400 }}>
            <div className="flex-center">
              <AppIcon />
            </div>
            <Grid container className="mt-4">
              <GenFormInputFields
                cb={setSignupFormWrapper}
                formJson={shopInfoFormJson}
              />
              <Grid className="my-4 flex-center" item xs={12}>
                <Typography className="mr-2 text-gray-600">
                  Already have an account ?
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  className="font-medium text-lg"
                  onClick={() => history.replace('/login')}
                >
                  Login
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={onSubmitForm}
                  className="w-full"
                  variant="contained"
                  color="primary"
                >
                  Register Shop
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
