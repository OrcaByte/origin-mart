import React, { useState } from 'react';
import {
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { StatesList } from '../utils/IndianStates';
import {
  mobileRegex,
  zipCodeRegex,
  emailRegex,
  genders,
  countries,
  maritialStatuses,
  genTextFieldInput,
  genDatePickerInput,
  genSelectInputField,
} from '../utils';
import GenFormInputFields from '../common/GenFormInputFields';
import http from '../utils/axiosBase';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function NewCustomerModal() {
  const [customerForm, setCustomerForm] = useState({ active: true });
  const [menuOpen, setMenuOpen] = React.useState(false);

  const setCustomerFormWrapper = (a, b) => {
    const tempObj = { ...customerForm };
    tempObj[a] = b;
    setCustomerForm(tempObj);
  };

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const createCustomer = () => {
    console.log(customerForm);
    http.post('/patient/api', customerForm).subscribe((res) => {
      console.log(res);
    });
  };

  const personalInfoFormJson = [
    genTextFieldInput('First Name', 'Enter name', 'firstName'),
    genTextFieldInput('Middle Name', 'Enter name', 'middleName'),
    genTextFieldInput('Last Name', 'Enter name', 'lastName'),
    genTextFieldInput('Username', 'Enter username', 'username'),
    genTextFieldInput(
      'Password',
      'Enter password',
      'password',
      (value) => value && value.length > 3,
      '',
      'password'
    ),
    genTextFieldInput(
      'Email Id',
      'Enter email',
      'emailId',
      (value) => value && emailRegex.test(value)
    ),
    genTextFieldInput(
      'Mobile Number',
      'Enter Number',
      'phoneNumber',
      (value) => {
        console.log(mobileRegex.test(value));
        return value && mobileRegex.test(value);
      }
    ),
    // genSelectInputField('Gender', '- Choose Option -', 'gender', genders),
    // genSelectInputField(
    //   'Maritial Status',
    //   '- Choose Option -',
    //   'maritialStatus',
    //   maritialStatuses
    // ),

    // genTextFieldInput('Father/Spouse', 'Enter name', 'fatherOrSpouseNm'),

    // genDatePickerInput(
    //   'Date of Birth',
    //   'DD/MM/YYYY',
    //   'dob',
    //   (value) => value && new Date(value)
    // ),
  ];

  const addressInfoFormJson = [
    genTextFieldInput('Address Line', 'Enter address', 'address'),
    genTextFieldInput('Land Mark', 'Enter landmark', 'landmark'),
    genSelectInputField(
      'Occupation',
      '- Choose Option -',
      'occupation',
      genders
    ),
    genTextFieldInput(
      'Pin Code',
      'Enter pin',
      'zip',
      (value) => value && zipCodeRegex.test(value)
    ),
    genSelectInputField(
      'State',
      '- Select state -',
      'state',
      StatesList.map((s) => {
        return {
          value: s.state,
          display: s.state,
        };
      })
    ),
    genSelectInputField(
      'City',
      '- Select city -',
      'city',
      () => {
        console.log(customerForm);
        if (customerForm['state'])
          return StatesList.find(
            (a) => a.state === customerForm['state']
          ).districts.map((v) => {
            return {
              value: v,
              display: v,
            };
          });
        return [];
      },
      (value) => customerForm['state'] && value
    ),
    genSelectInputField(
      'Country',
      '- Select country -',
      'country',
      countries,
      (value) => value,
      'India'
    ),
  ];

  return (
    <>
      <Button
        className="border-radius-25"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <AddIcon fontSize="small" /> &nbsp; New Customer
      </Button>

      <Dialog
        open={menuOpen}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="md"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Customer details
        </DialogTitle>
        <DialogContent dividers>
          <div className="p-4">
            <Typography variant="subtitle2">Personal Info</Typography>
            <div className="flex flex-wrap mr-4">
              <GenFormInputFields
                cb={setCustomerFormWrapper}
                formJson={personalInfoFormJson}
              />
            </div>
            {/* <Typography className="my-2" variant="subtitle2">
              Address Info
            </Typography>
            <div className="flex flex-wrap mr-4">
              <GenFormInputFields
                cb={setCustomerFormWrapper}
                formJson={addressInfoFormJson}
              />
            </div> */}
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined">Reset</Button>
          <Button
            onClick={createCustomer}
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
