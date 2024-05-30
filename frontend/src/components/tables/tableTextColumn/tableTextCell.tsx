import React from "react";
import styles from "./tableText.module.scss";
type TableTextCellProps = {
  value: string;
};

export const TableTextCell = ({ value }: TableTextCellProps) => {
  return (
    <div className={styles.textCellWrapper}>
      <p className={styles.textCellText}>{value}</p>
    </div>
  );
};
