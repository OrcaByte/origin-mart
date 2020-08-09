import React from 'react';
import MatSelectField from './MatSelectField';
import { TextFieldInput } from './SearchInput';
import { Typography, Grid } from '@material-ui/core';
import MatDatePicker from './MatDatePicker';

// this can accept
// 1. options as function that returns array or an array
// 2. all props other than label are passed to MatSelect component
const InputSelectField = ({ label, options, placeholder, ...otherProps }) => {
  return (
    <Grid
      container
      wrap="nowrap"
      justify="space-between"
      alignItems="center"
      item
      xs={12}
    >
      {label ?? (
        <Typography align="center" className="text-gray-700 text-xs">
          {label}
        </Typography>
      )}

      <MatSelectField
        options={typeof options === 'function' ? options() : options}
        {...otherProps}
        placeholder={
          <span className="text-gray-700 text-xs">{placeholder}</span>
        }
      />
    </Grid>
  );
};

const InputTextField = ({ label, ...otherProps }) => {
  return (
    <Grid
      container
      wrap="nowrap"
      justify="space-between"
      alignItems="center"
      item
      xs={12}
    >
      {label ?? (
        <Typography align="center" className="text-gray-700 text-xs">
          {label}
        </Typography>
      )}
      <TextFieldInput {...otherProps} />
    </Grid>
  );
};

const DatePickerInput = ({ label, ...otherProps }) => {
  return (
    <Grid
      container
      wrap="nowrap"
      justify="space-between"
      alignItems="center"
      item
      xs={12}
    >
      {label ?? (
        <Typography align="center" className="text-gray-700 text-xs">
          {label}
        </Typography>
      )}
      <MatDatePicker {...otherProps} />
    </Grid>
  );
};

const GenFormInputFields = ({ formJson, cb }) => {
  return formJson.map((props, ind) => {
    const componentNm = props.componentNm;
    delete props.componentNm;
    if (componentNm === 'TextField') {
      return <InputTextField key={`${ind}`} cb={cb} {...props} />;
    } else if (componentNm === 'SelectField') {
      return <InputSelectField key={`${ind}`} cb={cb} {...props} />;
    } else if (componentNm === 'DatePicker') {
      return <DatePickerInput key={`${ind}`} cb={cb} {...props} />;
    }
    return <h2 className="text-red-700">Something Went Wrong</h2>;
  });
};
export default GenFormInputFields;
