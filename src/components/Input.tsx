import React, { useEffect, useRef, InputHTMLAttributes } from "react";
import styled from 'styled-components'
import { useField } from "@unform/core";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input({ name, ...rest }: InputProps) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
        className="border-2 border-primary bg-white rounded-md p-2 text-base focus:border-secondary"
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}