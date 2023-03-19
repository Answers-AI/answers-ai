import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Props {
  sx?: any;
  label: string;
  options: any[];
  value: string[];
  onChange: any;
}
export default function AutocompleteSelect({ sx, label, options, value, onChange }: Props) {
  const handleChange = (event: any, newValue: any) => {
    const { target } = event;
    console.log('Values', target.value, newValue);
    onChange(
      // On autofill we get a stringified value.

      newValue
    );
  };
  return (
    <Autocomplete
      sx={{ width: '100%', ...sx }}
      freeSolo
      multiple
      limitTags={2}
      id={`${label}`}
      options={options}
      getOptionLabel={(option) => option}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={`Enter ${label}`} />
      )}
    />
  );
}
