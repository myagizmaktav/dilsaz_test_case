import { Todo } from "@/types/todoType";

import React from "react";
import { Sorting } from "@/types/sortingType";
import { SortIcon } from "@/assets/sortIcon";
import { TableStatusCell } from "./tableStatusCell";
import styles from "./tableStatus.module.scss";
type TableStatusColumnProps = {
  field: keyof Todo;
  ratio?: number;
  isDate?: boolean;
  data: Todo[];
  sortingPosition: Sorting;
  // eslint-disable-next-line no-unused-vars
  setSortingPosition: (value: Sorting) => void;
};

export const TableStatusColumn = ({
  field,
  data = [],
  setSortingPosition,
  sortingPosition,
}: TableStatusColumnProps) => {
  return (
    <div>
      <div className={styles.tableColumnWrapper}>
        <p className={styles.tableColumnTitle}>{field.toUpperCase()}</p>
        <div
          onClick={() => {
            if (sortingPosition.field !== `${field}`) {
              setSortingPosition({
                ...sortingPosition,
                position: "asc",
                field: `${field}`,
              });
            } else {
              setSortingPosition({
                ...sortingPosition,
                position: sortingPosition.position === "asc" ? "desc" : "asc",
                field: `${field}`,
              });
            }
          }}
          style={{
            cursor: "pointer",
            transform:
              sortingPosition.field === `${field}` &&
              sortingPosition.position === "desc"
                ? "rotate(180deg)"
                : "rotate(0deg)",
          }}
        >
          <SortIcon color="#000" />
        </div>
      </div>
      {data?.map((item) => (
        <React.Fragment key={item.id}>
          <TableStatusCell value={item[field]} />
        </React.Fragment>
      ))}
    </div>
  );
};
