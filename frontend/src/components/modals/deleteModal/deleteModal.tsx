import React from "react";

import { modalAtom } from "@/data/modal";
import { todoAtom, rawTodoAtom } from "@/data/todo";
import { useAtom } from "jotai";
import { Button } from "../../button/button";
import styles from "./deleteModal.module.scss";
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
      <div className={styles.deleteButton}>
        <Button
          title="Yes"
          onclick={() => {
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
          backgroundColor="#BEBEBE"
        />
        <Button title="No" onclick={hideInfo} backgroundColor="#2277e0" />
      </div>
    </div>
  );
};
