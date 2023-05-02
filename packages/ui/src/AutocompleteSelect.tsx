import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    console.log('Values', { event, newValue, options });
    onChange(
      // On autofill we get a stringified value.

      newValue
    );
  };
  return (
    <Autocomplete
      sx={{ width: '100%', ...sx }}
      disableCloseOnSelect
      freeSolo
      multiple
      id={`${label}`}
      options={options}
      getOptionLabel={getOptionLabel as any}
      value={value}
      onChange={handleChange}
      // renderTags={(tagValue, getTagProps) =>
      //   tagValue.map((option, index) => (
      //     <Chip
      //       label={getOptionLabel ? getOptionLabel(options[index]) : option}
      //       {...getTagProps({ index })}
      //       // disabled={fixedOptions.indexOf(option) !== -1}
      //     />
      //   ))
      // }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {getOptionLabel ? getOptionLabel(option) : (option as object).toString()}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={`Enter ${label}`} />
      )}
      {...props}
    />
  );
}
