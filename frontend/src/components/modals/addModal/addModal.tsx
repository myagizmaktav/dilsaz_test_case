import { modalAtom } from "@/data/modal";
import { priorityAtom } from "@/data/priority";
import { rawTodoAtom, todoAtom } from "@/data/todo";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import styles from "./addModal.module.scss";
export const AddModal = () => {
  const popup = useAtomValue(modalAtom);
  const [data, setData] = useAtom(todoAtom);
  const rawData = useAtomValue(rawTodoAtom);
  const status = useAtomValue(priorityAtom);
  const popupData = popup.data;

  return (
    <div className={styles.addModalWrapper}>
      <div>
        <select
          name="status"
          id="status"
          onChange={(e) => {
            const index = data.findIndex((d) => d.id === popupData?.id);
            const newData = [...data];
            newData[index].status = e.target.value;
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData?.id);
            const newRawData = [...rawData];
            newRawData[indexRaw].status = e.target.value;
          }}
        >
          {status.map((s) => {
            return (
              <option key={s.id} value={s.status}>
                {s.status}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.addModaInputWrapper}>
        <div className={styles.addInput}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={(e) => {
              const index = data.findIndex((d) => d.id === popupData?.id);
              const newData = [...data];
              newData[index].description = e.target.value;
              setData(newData);
              const indexRaw = rawData.findIndex((d) => d.id === popupData?.id);
              const newRawData = [...rawData];
              newRawData[indexRaw].description = e.target.value;
            }}
          />
        </div>
      </div>
    </div>
  );
};
