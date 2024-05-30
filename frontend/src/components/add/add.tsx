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
  const [isInputError, setIsInputError] = useState(false);
  const [selectValue, setSelectValue] = useState("Urgent");
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.addWrapper}>
      <div>
        <h1>Task Manager</h1>
      </div>
      <div className={styles.filteringWrapper}>
        <div className={`${styles.input} `}>
          <Input
            error={isInputError}
            onChange={(e) => {
              let value = e.target.value;
              if (value.match(/[^a-zA-Z0-9' 'wığüşöçĞÜŞÖÇİ]/g)) {
                value = value.replace(/[^a-zA-Z0-9wığüşöçĞÜŞÖÇİ]/g, "");
              }
              if (value.length) {
                setIsInputError(false);
              }
              setInputValue(value);
            }}
            value={inputValue}
            placeholder={
              isInputError ? "Please fill the input" : "Add a task..."
            }
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
              let value = e.target.value;
              console.log(value);
              setSelectValue(value);
            }}
          />
        </div>

        <div className={styles.button}>
          <Button
            title={"+ Create"}
            onclick={() => {
              if (inputValue === "" || selectValue === "") {
                setIsInputError(true);
                return;
              }

              setRawTodo((prev) => [
                ...prev,
                {
                  description: inputValue,
                  status: selectValue,
                  id: uuid4(),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              ]);
              setInputValue("");
              setSelectValue("Urgent");
            }}
          />
        </div>
      </div>
    </div>
  );
};
