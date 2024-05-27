import { Todo } from "@/types/todoType";
import { atom } from "jotai";

const rawTodoAtom = atom<Todo[]>([]);

const pullTodoAtom = atom(
  (get) => get(rawTodoAtom),
  (get, set) => {
    const isSSR = typeof window === "undefined";
    if (!isSSR) {
      const todo = get(rawTodoAtom);
      if (!todo?.length) {
        // to be continue
        // fetch("http://localhost:3000/api/priority");
      }
    } else {
      set(rawTodoAtom, []);
    }
  }
);
