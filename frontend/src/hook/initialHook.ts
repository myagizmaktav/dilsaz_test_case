import { rawPriorityAtom } from "@/data/priority";
import { sortingAtom } from "@/data/sorting";
import { rawTodoAtom } from "@/data/todo";
import { Todo } from "@/types/todoType";
import { fetcher } from "@/utils/fetcher";
import { setStatusSortData } from "@/utils/sortStatusData";
import { sortTextData } from "@/utils/sortTextData";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

export const useInitialHook = () => {
  const [rawTodo, setRawTodo] = useAtom(rawTodoAtom);
  const [priority, setPriority] = useAtom(rawPriorityAtom);
  const sortingPosition = useAtomValue(sortingAtom);

  useEffect(() => {
    if (rawTodo?.length) {
      let data = JSON.parse(JSON.stringify([...rawTodo])) as Todo[];

      if (sortingPosition.priority !== "Priority(All)") {
        data = data.filter((d) => d.status === sortingPosition.priority);
      }

      if (sortingPosition.search) {
        data = data.filter((d) => {
          const desc = d.description.toLowerCase().trim();
          const search = sortingPosition.search.toLowerCase().trim();
          return desc.includes(search);
        });
      }

      if (sortingPosition.field !== "status") {
        data = sortTextData(
          data,
          sortingPosition.position,
          sortingPosition.field
        );
      } else {
        data = setStatusSortData(
          data,
          sortingPosition.position,
          sortingPosition.field,
          priority
        );
      }

      setRawTodo(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRawTodo, setStatusSortData, sortTextData, sortingPosition, rawTodo]);

  const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3001";

  const { data: todoData, error: todoError } = useSWR(
    `${host}/api/database/post/getJobListWithFilter`,
    fetcher
  );
  if (todoData) {
    setRawTodo(todoData.value);
  }
  if (todoError) {
    console.log(todoError);
  }

  const { data: priorityData, error: priorityError } = useSWR(
    `${host}/api/database/post/getPriorityList`,
    fetcher
  );
  if (priorityData) {
    setPriority(priorityData.value);
  }
  if (priorityError) {
    console.log(priorityError);
  }
};
