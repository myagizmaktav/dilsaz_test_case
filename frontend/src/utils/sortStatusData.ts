import { Priority } from "@/types/priorityType";

export const setStatusSortData = <T extends Array<any>>(
  todoData: T,
  sortingPostion: "asc" | "desc" | string,
  dataField: string,
  status: Priority[]
): T => {
  return todoData.sort((a, b) => {
    const aStatusValue = status.find((s) => s.status === a[dataField])?.level;
    const bStatusValue = status.find((s) => s.status === b[dataField])?.level;

    if (sortingPostion === "asc") {
      return Number(bStatusValue!) - Number(aStatusValue!);
    } else {
      return Number(aStatusValue!) - Number(bStatusValue!);
    }
  });
};
