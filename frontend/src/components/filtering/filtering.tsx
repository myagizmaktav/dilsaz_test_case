import { useAtom, useAtomValue } from "jotai";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { priorityAtom } from "@/data/priority";
import styles from "./filtering.module.scss";
import { sortingAtom } from "@/data/sorting";

export const Filtering = () => {
  const priority = useAtomValue(priorityAtom);
  const [sorting, setSorting] = useAtom(sortingAtom);

  return (
    <div className={styles.filteringWrapper}>
      <div className={styles.input}>
        <Input
          onChange={(e) => {
            console.log(e.target.value);
            setSorting((prev) => ({
              ...prev,
              search: e.target.value,
            }));
          }}
          value={sorting.search}
        />
      </div>

      <div className={styles.select}>
        <Select
          options={[
            { value: "Priority(All)", label: "Priority(All)" },
            ...priority.map((p) => {
              return { value: p.status, label: p.status };
            }),
          ]}
          onchange={(e) => {
            setSorting((prev) => ({
              ...prev,
              priority: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};
