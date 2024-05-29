import { Todo } from "@/types/todoType";
import { atom } from "jotai";

export const rawTodoAtom = atom<Todo[]>([]);
export const todoAtom = atom<Todo[]>([]);
