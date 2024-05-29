import { Todo } from "@/types/todoType";
import { atom } from "jotai";

export const rawTodoAtom = atom<Todo[]>([]);
