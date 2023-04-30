import React, { FC, InputHTMLAttributes } from "react";
import DatePicker from 'react-datepicker'
import { Controller, FieldError, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  register?: any;
}

export const FormDate: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  placeholder,
  ...rest
}) => {
  const { control } = useForm()
  const hasError = !!error
  const errorMessage = error?.message

  return (
    <div className=''>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <DatePicker
            placeholderText={placeholder}
            name={name}
            selected={value}
            onChange={onChange}
            ref={ref}
            className="w-full px-3 py-2 mb-1 border-2 border-gray-800 rounded-sm bg-lightPrimary first-letter:rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
          />
        )}
      />
      {hasError && <span role="alert">{errorMessage}</span>}
    </div>
  );
};


