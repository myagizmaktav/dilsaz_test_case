import React from "react";

import { modalAtom } from "@/data/modal";

import { todoAtom, rawTodoAtom } from "@/data/todo";
import { useAtom } from "jotai";

export const DeleteModal = () => {
  const [popup, setPopup] = useAtom(modalAtom);
  const hideInfo = () => {
    setPopup({
      visible: false,

      type: "",
    });
  };

  const [data, setData] = useAtom(todoAtom);

  const [rawData, setRawData] = useAtom(rawTodoAtom);

  const popupData = popup.data;

  return (
    <div>
      <div>
        <p>Are you sure you want to delete this item?</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            background: "#BEBEBE",
            color: "white",
            padding: "5px 30px 5px 30px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            const index = data.findIndex((d) => d.id === popupData?.id);
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData?.id);
            const newRawData = [...rawData];
            newRawData.splice(indexRaw, 1);
            setRawData(newRawData);
            hideInfo();
          }}
        >
          Yes
        </button>
        <button
          onClick={hideInfo}
          style={{
            background: "#2277e0",
            color: "white",
            padding: "5px 30px 5px 30px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};
