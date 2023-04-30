import React, { FC, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  register?: any;
  wrapperClass?: string;
  className?: string;
}

export const FormInput: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  ...rest
}) => {
  const hasError = !!error
  const errorMessage = error?.message

  return (
    <div className=''>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        aria-invalid={hasError ? "true" : "false"}
        {...register(name)}
        {...rest}
        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
      />
      {hasError && <span role="alert">{`${errorMessage}`}</span>}
    </div>
  );
};


