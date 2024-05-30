import { modalAtom } from "@/data/modal";
import { todoAtom, rawTodoAtom } from "@/data/todo";
import { useAtom, useAtomValue } from "jotai";
import { priorityAtom } from "@/data/priority";
import { Select } from "../../select/select";
import { useState } from "react";
import { Button } from "../../button/button";
import styles from "./editModal.module.scss";
export const EditModal = () => {
  const [popup, setPopup] = useAtom(modalAtom);
  const [data, setData] = useAtom(todoAtom);
  const status = useAtomValue(priorityAtom);
  const [rawData, setRawData] = useAtom(rawTodoAtom);
  const [value, setValue] = useState(popup?.data?.status || "");
  const popupData = popup.data;
  const hideInfo = () => {
    setPopup({
      visible: false,

      type: "",
    });
  };

  return (
    <div className={styles.editWrapper}>
      <div
        style={{
          width: "100%",
        }}
      >
        <Select
          value={value}
          options={status.map((s) => {
            return {
              label: s.status,
              value: s.status,
            };
          })}
          onchange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>

      <div className={styles.dataList}>
        <div className={styles.dataCell}>
          <p className={styles.dataTitle}>{`ID :`}</p> {popupData?.id}
        </div>
        <div className={styles.dataCell}>
          <p className={styles.dataTitle}>{`Description :`}</p>{" "}
          {popupData?.description}
        </div>

        <div className={styles.dataCell}>
          <p className={styles.dataTitle}>{`Updated At :`}</p>
          {popupData?.updated_at}
        </div>
        <div className={styles.dataCell}>
          <p className={styles.dataTitle}>{`Created At :`}</p>{" "}
          {popupData?.created_at}
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <Button
          title={"Save"}
          backgroundColor="blue"
          onclick={() => {
            const index = data.findIndex((d) => d.id === popupData?.id);
            const newData = [...data];
            console.log(newData[index].status);
            newData[index].status = value;
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData?.id);
            const newRawData = [...rawData];
            newRawData[indexRaw].status = value;
            setRawData(newRawData);
            hideInfo();
          }}
        ></Button>
      </div>
    </div>
  );
};
