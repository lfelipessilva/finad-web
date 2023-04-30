import React, { FC, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Option {
  id: string;
  name: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  register?: any;
  options: Option[] | undefined;
}

export const FormSelect: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  options,
  ...rest
}) => {
  const hasError = !!error
  const errorMessage = error?.message

  return (
    <div className=''>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...rest}
        className="w-full px-3 py-2 mb-1 border-2 border-gray-800 bg-lightPrimary rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
      >
        {!!options?.length && options.map((option, index) => (
          <option value={option.id} key={index}>
            {option.name}
          </option>
        ))}
      </select>
      {hasError && <span role="alert">{errorMessage}</span>}
    </div>
  );
};


