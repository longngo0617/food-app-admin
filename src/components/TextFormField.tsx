import React from "react";
import { getIn, FieldProps } from "formik";
import { TextareaAutosize, TextField } from "@material-ui/core";

export const TextFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};
export const TextArea: React.FC<FieldProps> = ({ field }) => {
  return (
    <TextareaAutosize
      placeholder="Bạn đang nghĩ gì ?"
      className="text__input"
      {...field}
    />
  );
};
