import { FieldProps, getIn } from "formik";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export const SelectFormField: React.FC<
  FieldProps & {
    label?: string;
    options: Array<any>;
    categories?: boolean;
  }
> = ({ field, form, label, options, categories, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  if (categories) {
    return (
      <FormControl fullWidth error={!!errorText}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select fullWidth {...field} {...props}>
          {options.map((op,index) => (
            <MenuItem key={index} value={op.idType}>
              {op.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    );
  }
  return (
    <FormControl fullWidth error={!!errorText}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select fullWidth {...field} {...props}>
        {options.map((op) => (
          <MenuItem key={op} value={op}>
            {op}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};
