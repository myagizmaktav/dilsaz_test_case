import { useAtom, useAtomValue } from "jotai";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { priorityAtom } from "@/data/priority";
import styles from "./filtering.module.scss";
import { sortingAtom } from "@/data/sorting";
import { useWindowSize } from "@/hook/useDimension";

export const Filtering = () => {
  const { isBigScreen } = useWindowSize();
  const priority = useAtomValue(priorityAtom);
  const [sorting, setSorting] = useAtom(sortingAtom);

  return (
    <div className={styles.filterWrapper}>
      <div>
        <h1>Filter</h1>
      </div>

      <div className={styles.filteringWrapper}>
        <div className={styles.input}>
          <Input
            placeholder="Search"
            onChange={(e) => {
              setSorting((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            }}
            value={sorting.search}
          />
        </div>

        <div
          className={styles.select}
          style={{
            width: isBigScreen ? "200px" : "100px",
            marginLeft: isBigScreen ? "20px" : "10px",
          }}
        >
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
    </div>
  );
};
