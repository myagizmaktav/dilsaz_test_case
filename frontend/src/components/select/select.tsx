import React from "react";
import styles from "./select.module.scss";

type SelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export const Select = ({ options, onchange, value }: SelectProps) => {
  return (
    <select value={value} className={styles.select} onChange={onchange}>
      {options?.map((option) => (
        <option
          key={option.value}
          className={styles.option}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
