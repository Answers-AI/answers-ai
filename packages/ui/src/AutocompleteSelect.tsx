import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip } from '@mui/material';

interface Props<T> {
  sx?: any;
  label: string;
  options: T[];
  value: T[];
  onChange: (value: T[]) => void;
  getOptionLabel?: (value: T) => string;
  getOptionValue?: (value: T) => string;
}
export default function AutocompleteSelect<T>({
  sx,
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  ...props
}: Props<T>) {
  const handleChange = (event: any, newValue: any) => {
    const { target } = event;
    // console.log('Values', target.value, newValue);
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
      id={`${label}`}
      options={options}
      getOptionLabel={getOptionLabel as any}
      value={getOptionValue ? value?.map(getOptionValue) : value}
      onChange={handleChange}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={getOptionLabel ? getOptionLabel(options[index]) : option}
            {...getTagProps({ index })}
            // disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={`Enter ${label}`} />
      )}
      {...props}
    />
  );
}
