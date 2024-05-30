import React from "react";
import styles from "./tableStatus.module.scss";
type TableTextCellProps = {
  value: string;
};

export const TableStatusCell = ({ value }: TableTextCellProps) => {
  const tag = () => {
    if (value === "Urgent") {
      return <span className={styles.urgent}>{value}</span>;
    }
    if (value === "Regular") {
      return <span className={styles.regular}>{value}</span>;
    }
    if (value === "Trivial") {
      return <span className={styles.trivial}>{value}</span>;
    }
    return <span>{value}</span>;
  };

  return (
    <div className={styles.tagWrapper}>
      <p>{tag()}</p>
    </div>
  );
};
