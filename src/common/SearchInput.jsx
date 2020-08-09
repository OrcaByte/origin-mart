import React from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    width: 200,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export function TextFieldInput({
  className = 'px-3 py-1 rounded-md border-solid border border-gray-400',
  placeholder,
  inputType = 'text',
  cb = (fctrlNm, value) => console.log(value),
  initialValue = '',
  validator = (value) => value,
  formControlName,
  ...otherProps
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);

  const onChangeValue = (value) => {
    cb(formControlName, validator(value) ? value : null);
    setValue(value);
  };

  return (
    <FormControl className={`${classes.wrapper} ${className}`}>
      <BootstrapInput
        onChange={(e) => onChangeValue(e.target.value)}
        className={`textInputItalicPlaceholder text-sm`}
        autoFocus={true}
        type={inputType}
        placeholder={placeholder}
        value={value}
        {...otherProps}
      />
    </FormControl>
  );
}
