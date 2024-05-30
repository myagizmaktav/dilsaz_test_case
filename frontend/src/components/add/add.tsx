import { priorityAtom } from "@/data/priority";

import { useAtomValue, useSetAtom } from "jotai";
import styles from "./add.module.scss";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { Button } from "../button/button";
import { useState } from "react";
import { rawTodoAtom } from "@/data/todo";
import uuid4 from "uuid4";

export const Add = () => {
  const priority = useAtomValue(priorityAtom);

  const setRawTodo = useSetAtom(rawTodoAtom);
  const [newDataValue, setNewDataValue] = useState({
    description: "",
    status: "",
  });
  const [selectValue, setSelectValue] = useState("Urgent");
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.addWrapper}>
      <div>
        <h1>Task Manager</h1>
      </div>
      <div className={styles.filteringWrapper}>
        <div className={styles.input}>
          <Input
            onChange={(e) => {
              setInputValue(e.target.value);
              setNewDataValue((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            value={inputValue}
          />
        </div>

        <div className={styles.select}>
          <Select
            options={[
              ...priority.map((p) => {
                return { value: p.status, label: p.status };
              }),
            ]}
            value={selectValue}
            onchange={(e) => {
              setSelectValue(e.target.value);
              setNewDataValue((prev) => ({
                ...prev,
                status: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.button}>
          <Button
            title={"+Create"}
            onclick={() => {
              setRawTodo((prev) => [
                ...prev,
                {
                  description: newDataValue.description,
                  status: newDataValue.status,
                  id: uuid4(),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              ]);
              console.log(newDataValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};
