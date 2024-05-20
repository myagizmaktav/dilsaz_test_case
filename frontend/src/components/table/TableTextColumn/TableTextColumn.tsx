import React from "react";
import { useZustandStore } from "../../../data/data";

import { SortIcon } from "../../../assets/sortIcon";
import { Todo } from "../../../../../backend/src/types/todoTypes";
import { TableTextCell } from "./TableTextCell";

type TableTextColumnProps = {
  field: keyof Todo;
  ratio?: number;
  isDate?: boolean;
};

export const TableTextColumn = ({
  field,
  ratio = 1,
  isDate,
}: TableTextColumnProps) => {
  const data = useZustandStore((state) => state.data);
  const sortingPosition = useZustandStore((state) => state.sortingPosition);
  const setSortingPosition = useZustandStore(
    (state) => state.setSortingPosition
  );

  return (
    <div>
      <div
        style={{
          background: "#e4eafd",
          paddingRight: "5px",
          paddingLeft: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "gray",
            fontWeight: "bold",
          }}
        >
          {field.toUpperCase()}
        </p>
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
