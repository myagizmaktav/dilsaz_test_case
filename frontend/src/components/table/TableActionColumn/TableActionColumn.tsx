import React from "react";
import { DeleteIcon } from "../../../assets/deleteIcon";
import { EditIcon } from "../../../assets/editIcon";
import { useZustandStore } from "../../../data/data";

export const TableActionColumn = () => {
  const setPopup = useZustandStore((state) => state.setPopup);
  const data = useZustandStore((state) => state.data);

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
          Actions
        </p>
      </div>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <div
            style={{
              paddingLeft: "5px",
              display: "flex",
              alignItems: "center",
              height: "175px",
              gap: "5px",
            }}
          >
            <button
              style={{
                border: "none",
                background: "#E8E8E8",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setPopup({
                  visible: true,
                  type: "Edit",
                  data: item,
                });
              }}
            >
              <EditIcon color="#000" width={20} height={20} />
            </button>
            <button
              style={{
                cursor: "pointer",
                border: "none",
                background: "#E8E8E8",
                borderRadius: "5px",
                padding: "5px",
              }}
              onClick={() => {
                setPopup({
                  visible: true,
                  type: "Delete",
                  data: item,
                });
              }}
            >
              <DeleteIcon color="#000" width={20} height={20} />
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
