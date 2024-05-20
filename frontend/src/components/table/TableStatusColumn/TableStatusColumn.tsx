import { useZustandStore } from "../../../data/data";
import { SortIcon } from "../../../assets/sortIcon";
import { Todo } from "../../../../../backend/src/types/todoTypes";
import { TableStatusCell } from "./TableStatusCell";
import React from "react";

type TableStatusColumnProps = {
  field: keyof Todo;
  ratio?: number;
};

export const TableStatusColumn = ({ field }: TableStatusColumnProps) => {
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
          <TableStatusCell value={item[field]} />
        </React.Fragment>
      ))}
    </div>
  );
};
