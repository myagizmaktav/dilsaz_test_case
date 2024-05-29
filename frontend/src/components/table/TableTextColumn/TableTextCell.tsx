import React from "react";
type TableTextCellProps = {
  value: string;
};

export const TableTextCell = ({ value }: TableTextCellProps) => {
  return (
    <div
      style={{
        paddingLeft: "5px",
        display: "flex",
        alignItems: "center",
        height: "175px",
      }}
    >
      <p
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          hyphens: "auto",
          whiteSpace: "normal",
          width: "100%",
        }}
      >
        {value}
      </p>
    </div>
  );
};
