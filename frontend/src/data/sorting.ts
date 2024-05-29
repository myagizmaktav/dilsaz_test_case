import { Sorting } from "@/types/sortingTypes";
import { atom } from "jotai";

export const sortingAtom = atom<Sorting>({
  position: "asc",
  field: "created_at",
  search: "",
  priority: "created_at",
});
