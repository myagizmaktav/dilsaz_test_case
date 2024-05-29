import { Priority } from "@/types/priorityType";

export const setStatusSortData = <T extends Array<any>>(
  textData: T,
  sortingPostion: "asc" | "desc" | string,
  dataField: string,
  status: Priority[]
): T => {
  if (sortingPostion === "asc") {
    return textData.sort((a, b) => {
      const aStatusValue = status.find((s) => s.name === a[dataField])?.level;
      const bStatusValue = status.find((s) => s.name === b[dataField])?.level;

      if (sortingPostion === "asc") {
        return Number(bStatusValue!) - Number(aStatusValue!);
      } else {
        return Number(aStatusValue!) - Number(bStatusValue!);
      }
    });
  }
  return textData.sort((a, b) => b[dataField].localeCompare(a[dataField]));
};
