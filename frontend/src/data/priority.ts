import { atom } from "jotai";
import { Priority } from "@/types/priorityType";

const rawPriorityAtom = atom<Priority[]>([]);

const pullPriorityAtom = atom(
  (get) => get(rawPriorityAtom),
  (get, set) => {
    const isSSR = typeof window === "undefined";
    if (!isSSR) {
      const priority = get(rawPriorityAtom);
      if (!priority?.length) {
        // to be continue
        // fetch("http://localhost:3000/api/priority");
      }
    } else {
      set(rawPriorityAtom, []);
    }
  }
);
