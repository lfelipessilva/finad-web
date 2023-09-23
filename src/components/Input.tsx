import React, { useEffect, useRef, InputHTMLAttributes } from "react";
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
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ""
      },
    })

  }, [fieldName, registerField])

  return (
    <>
      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
        className="border-2 border-primary bg-white rounded-md p-2 text-base focus:border-secondary focus:outline-none"
      />

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}