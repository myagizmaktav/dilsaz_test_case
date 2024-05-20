import React, { useCallback } from "react";
import { useZustandStore } from "../../data/data";
import { status } from "../../utils/sortStatusData";

export const AddModal = () => {
  const popup = useZustandStore((state) => state.popup);
  const hideInfo = useCallback(() => {
    useZustandStore.setState({ popup: { ...popup, visible: false } });
  }, []);
  const data = useZustandStore((state) => state.data);
  const setData = useZustandStore((state) => state.setData);
  const sortingPosition = useZustandStore((state) => state.sortingPosition);
  const rawData = useZustandStore((state) => state.rawData);
  const setRawData = useZustandStore((state) => state.setRawData);

  const popupData = popup.data;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      <div>
        <select
          name="status"
          id="status"
          onChange={(e) => {
            const index = data.findIndex((d) => d.id === popupData.id);
            const newData = [...data];
            newData[index].status = e.target.value;
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData.id);
            const newRawData = [...rawData];
            newRawData[indexRaw].status = e.target.value;
          }}
        >
          {status.map((s) => {
            return <option value={s.name}>{s.name}</option>;
          })}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={(e) => {
              const index = data.findIndex((d) => d.id === popupData.id);
              const newData = [...data];
              newData[index].description = e.target.value;
              setData(newData);
              const indexRaw = rawData.findIndex((d) => d.id === popupData.id);
              const newRawData = [...rawData];
              newRawData[indexRaw].description = e.target.value;
            }}
          />
        </div>
      </div>
    </div>
  );
};
