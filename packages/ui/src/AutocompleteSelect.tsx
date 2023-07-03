import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props<T> {
  sx?: any;
  label?: string;
  placeholder?: string;
  options: T[];
  value: T[];
  onChange?: (value: T[]) => void;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
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
  placeholder,
  ...props
}: Props<T>) {
  const handleChange = (event: any, newValue: any) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Autocomplete
        open={options?.length > 0}
        disablePortal
        sx={{
          'width': '100%',
          ...sx,

          '.MuiCollapse-wrapperInner': {
            gap: 1,
            display: 'flex',
            flexDirection: 'column'
          },
          '.MuiAutocomplete-popper': { position: 'relative!important', width: '100%' }
        }}
        disableCloseOnSelect
        freeSolo
        multiple
        id={`${label}`}
        options={options}
        getOptionLabel={getOptionLabel as any}
        value={value}
        onChange={handleChange}
        PopperComponent={({ children, ...props }: any) => (
          <Box
            {...props}
            sx={{
              'position': 'relative!important',
              'width': '100%!important',
              '.MuiAutocomplete-listbox': {
                overflow: 'auto',
                maxHeight: 175
              }
            }}>
            {children}
          </Box>
        )}
        renderTags={() => null}
        // renderTags={(tagValue, getTagProps) =>
        //   tagValue.map((option, index) => (
        //     <Chip
        //       label={getOptionLabel ? getOptionLabel(options[index]) : option}
        //       {...getTagProps({ index })}
        //       // disabled={fixedOptions.indexOf(option) !== -1}
        //     />
        //   ))
        // }
        // @ts-expect-error
        renderOption={({ key, ...itemProps }, option, { selected }) => (
          <li key={key} {...itemProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel ? getOptionLabel(option) : (option as object).toString()}
          </li>
        )}
        {...props}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder ?? `Enter ${label}`} />
        )}
      />
    </Box>
  );
}
