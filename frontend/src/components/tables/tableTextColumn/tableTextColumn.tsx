import React from "react";

import { SortIcon } from "@/assets/sortIcon";
import { Todo } from "@/types/todoType";
import { Sorting } from "@/types/sortingType";
import { TableTextCell } from "./tableTextCell";
import styles from "./tableText.module.scss";
type TableTextColumnProps = {
  field: keyof Todo;
  ratio?: number;
  isDate?: boolean;
  data: Todo[];
  sortingPosition: Sorting;
  // eslint-disable-next-line no-unused-vars
  setSortingPosition: (value: Sorting) => void;
};

export const TableTextColumn = ({
  field,
  isDate,
  data = [],
  setSortingPosition,
  sortingPosition,
}: TableTextColumnProps) => {
  return (
    <div>
      <div className={styles.textTableColumnWrapper}>
        <p className={styles.textTableColumnTitle}>{field.toUpperCase()}</p>
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
          className={styles.sortIcon}
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
          <TableTextCell
            value={
              isDate ? new Date(item[field]).toLocaleDateString() : item[field]
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
};
