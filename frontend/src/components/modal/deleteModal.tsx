import React, { useCallback } from "react";
import { useZustandStore } from "../../data/data";

export const DeleteModal = () => {
  const popup = useZustandStore((state) => state.popup);
  const hideInfo = useCallback(() => {
    useZustandStore.setState({ popup: { ...popup, visible: false } });
  }, [popup]);
  const data = useZustandStore((state) => state.data);
  const setData = useZustandStore((state) => state.setData);

  const rawData = useZustandStore((state) => state.rawData);
  const setRawData = useZustandStore((state) => state.setRawData);

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
            const index = data.findIndex((d) => d.id === popupData.id);
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData.id);
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
