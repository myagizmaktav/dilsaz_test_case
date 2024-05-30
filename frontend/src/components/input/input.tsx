import React from "react";
import styles from "./input.module.scss";

type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
};

export const Input = ({
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${error ? styles["input-error"] : ""}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
