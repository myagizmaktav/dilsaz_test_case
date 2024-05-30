import { sortingAtom } from "@/data/sorting";

import { useWindowSize } from "@/hook/useDimension";
import { useAtom, useSetAtom } from "jotai";
import { TableActionColumn } from "./tableActionColumn/tableActionColumn";
import { modalAtom } from "@/data/modal";
import { Todo } from "@/types/todoType";
import styles from "./tables.module.scss";
import { TableTextColumn } from "./tableTextColumn/tableTextColumn";
import { TableStatusColumn } from "./tableStatusColumn/tableStatusColumn";

type tableProps = {
  todo: Todo[];
};
export const Tables = ({ todo }: tableProps) => {
  const [sortingPosition, setSortingPosition] = useAtom(sortingAtom);
  const setPopup = useSetAtom(modalAtom);
  const { isBigScreen } = useWindowSize();

  return (
    <div className={styles.tablesWrapper}>
      {isBigScreen && (
        <div className={styles.flex}>
          <TableTextColumn
            field="id"
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        </div>
      )}

      <div className={styles.flex}>
        <TableTextColumn
          field="description"
          data={todo}
          setSortingPosition={setSortingPosition}
          sortingPosition={sortingPosition}
        />
      </div>
      <div className={styles.flex}>
        <TableStatusColumn
          field="status"
          data={todo}
          setSortingPosition={setSortingPosition}
          sortingPosition={sortingPosition}
        />
      </div>

      {isBigScreen && (
        <div className={styles.flex}>
          <TableTextColumn
            field="updated_at"
            isDate={true}
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        </div>
      )}

      {isBigScreen && (
        <div className={styles.flex}>
          <TableTextColumn
            field="created_at"
            isDate={true}
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        </div>
      )}

      <div className={styles.flex}>
        <TableActionColumn data={todo} setPopup={setPopup} />
      </div>
    </div>
  );
};
