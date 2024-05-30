import { sortingAtom } from "@/data/sorting";
import { todoAtom } from "@/data/todo";
import { useWindowSize } from "@/hook/useDimension";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { TableTextColumn } from "../table/TableTextColumn/TableTextColumn";
import { TableStatusColumn } from "../table/TableStatusColumn/TableStatusColumn";
import { TableActionColumn } from "../table/TableActionColumn/TableActionColumn";
import { modalAtom } from "@/data/modal";

export const Tables = () => {
  const todo = useAtomValue(todoAtom);
  const [sortingPosition, setSortingPosition] = useAtom(sortingAtom);
  const setPopup = useSetAtom(modalAtom);
  const { isBigScreen } = useWindowSize();

  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        {isBigScreen && (
          <TableTextColumn
            field="id"
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        )}
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <TableTextColumn
          field="description"
          data={todo}
          setSortingPosition={setSortingPosition}
          sortingPosition={sortingPosition}
        />
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <TableStatusColumn
          field="status"
          data={todo}
          setSortingPosition={setSortingPosition}
          sortingPosition={sortingPosition}
        />
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        {isBigScreen && (
          <TableTextColumn
            field="updated_at"
            isDate={true}
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        )}
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        {isBigScreen && (
          <TableTextColumn
            field="created_at"
            isDate={true}
            data={todo}
            setSortingPosition={setSortingPosition}
            sortingPosition={sortingPosition}
          />
        )}
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <TableActionColumn data={todo} setPopup={setPopup} />
      </div>
    </div>
  );
};
