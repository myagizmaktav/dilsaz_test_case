export const setStatusSortData = <T extends Array<any>>(
  textData: T,
  sortingPostion: "asc" | "desc",
  dataField: string
): T => {
  if (sortingPostion === "asc") {
    return textData.sort((a, b) => {
      const aStatusValue = status.find((s) => s.name === a[dataField])?.value;
      const bStatusValue = status.find((s) => s.name === b[dataField])?.value;

      if (sortingPostion === "asc") {
        return bStatusValue! - aStatusValue!;
      } else {
        return aStatusValue! - bStatusValue!;
      }
    });
  }
  return textData.sort((a, b) => b[dataField].localeCompare(a[dataField]));
};

export const status = [
  { name: "Urgent", value: 4 },
  { name: "Trivial", value: 2 },
  { name: "Regular", value: 3 },
];
