import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: '0.875rem !important',
    padding: 9,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));




// TODO: this component shouldn't receive validator
// ! only callBack should be there
export default function MatSelectField({
  placeholder,
  options,
  initialValue = 'null',
  formControlName,
  validator = (a) => true,
  cb = console.log,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);

  const onChangeSelection = (value) => {
    cb(formControlName, validator(value) ? value : null);
    setValue(value);
  };
  return (
    <FormControl className={classes.wrapper}>
      <Select
        value={value}
        onChange={(e) => onChangeSelection(e.target.value)}
        input={<BootstrapInput />}
      >
        <MenuItem disabled value="null">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
