import { Sorting } from "@/types/sortingType";
import { atom } from "jotai";

export const sortingAtom = atom<Sorting>({
  position: "asc",
  field: "status",
  search: "",
  priority: "Priority(All)",
});
