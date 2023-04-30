import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
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
  return (
    <div className=''>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...rest}
        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
      />
      {error && <span role="alert">{error}</span>}
    </div>
  );
};


