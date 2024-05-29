export function sortTextData<T extends Array<any>>(
  textData: T,
  sortingPostion: "asc" | "desc" | string,
  dataField: string
): T {
  if (sortingPostion === "asc") {
    return textData.sort((a, b) => a[dataField].localeCompare(b[dataField]));
  }
  return textData.sort((a, b) => b[dataField].localeCompare(a[dataField]));
}
