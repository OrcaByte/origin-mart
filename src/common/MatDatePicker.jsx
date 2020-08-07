import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputAdornment, IconButton } from '@material-ui/core';
import { TextFieldInput } from './SearchInput';
import EventIcon from '@material-ui/icons/Event';

export default function MatDatePicker({
  initialValue = '',
  placeholder,
  formControlName,
  cb,
  validator,
}) {
  // The first commit of Material-UI
  const [value, setValue] = React.useState(initialValue);
  const TextFieldInputRef = React.forwardRef((props, ref) => (
    <TextFieldInput
      {...props}
      innerRef={ref}
      className="px-2 py-1 rounded-md border-solid border border-gray-400"
      endAdornment={
        <InputAdornment position="end">
          <IconButton size="small">
            <EventIcon className="text-gray-500" />
          </IconButton>
        </InputAdornment>
      }
      placeholder={placeholder}
    />
  ));

  return (
    <div>
      <DatePicker
        selected={value}
        onChange={(date) => {
          cb(formControlName, validator(date) ? date : null);
          setValue(date);
        }}
        placeholderText={placeholder}
        customInput={<TextFieldInputRef />}
      />
    </div>
  );
}
