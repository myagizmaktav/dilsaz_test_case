import React from "react";
type TableTextCellProps = {
  value: string;
};

export const TableStatusCell = ({ value }: TableTextCellProps) => {
  const tag = () => {
    if (value === "Urgent") {
      return (
        <span
          style={{
            color: "#fff",
            background: "red",
            padding: 5,
            borderRadius: 5,
          }}
        >
          {value}
        </span>
      );
    }
    if (value === "Regular") {
      return (
        <span
          style={{
            color: "#fff",
            background: "orange",
            padding: 5,
            borderRadius: 5,
          }}
        >
          {value}
        </span>
      );
    }
    if (value === "Trivial") {
      return (
        <span
          style={{
            color: "#fff",
            background: "blue",
            padding: 5,
            borderRadius: 5,
          }}
        >
          {value}
        </span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <div
      style={{
        paddingLeft: "5px",
        display: "flex",
        alignItems: "center",
        height: "175px",
      }}
    >
      <p>{tag()}</p>
    </div>
  );
};
