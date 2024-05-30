import React from "react";
import { DeleteIcon } from "@/assets/deleteIcon";
import { EditIcon } from "@/assets/editIcon";
import { Todo } from "@/types/todoType";
import { Modal } from "@/types/modalType";
import styles from "./tableActionColumn.module.scss";
import { Button } from "@/components/button/button";
type TableActionColumnProps = {
  data: Todo[];
  // eslint-disable-next-line no-unused-vars
  setPopup: (args: Modal) => void;
};
export const TableActionColumn = ({
  data = [],
  setPopup,
}: TableActionColumnProps) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <p className={styles.title}>Actions</p>
      </div>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <div className={styles.buttonWrapper}>
            <Button
              title={<EditIcon color="#000" width={20} height={20} />}
              onclick={() => {
                setPopup({
                  visible: true,
                  type: "Edit",
                  data: item,
                });
              }}
              backgroundColor="#E8E8E8"
            />
            <Button
              title={<DeleteIcon color="#000" width={20} height={20} />}
              onclick={() => {
                setPopup({
                  visible: true,
                  type: "Delete",
                  data: item,
                });
              }}
              backgroundColor="#E8E8E8"
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
