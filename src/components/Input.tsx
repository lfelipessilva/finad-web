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
      <InputStyle
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}

const InputStyle = styled.input`
   border: 0;
   background: #FBFBFB;
   border-radius: 8px;
   padding: 9px 12px;
   font-size: 16px;
   border: 2px solid ${props => props.theme.primary};
   outline: none;

   &:focus {
      border: 2px solid ${props => props.theme.secondary};
      background: white;
   }
`