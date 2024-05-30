import styles from "./button.module.scss";
import { JSX } from "react";
type ButtonProps = {
  backgroundColor?: string;
  title: string | JSX.Element;
  onclick?: () => void;
};

export const Button = ({
  backgroundColor = "red",
  title,
  onclick = () => {},
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor,
        border: `1px solid ${backgroundColor}`,
      }}
      className={styles.button}
      onClick={onclick}
    >
      {title}
    </button>
  );
};
