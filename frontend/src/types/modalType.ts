import { Todo } from "./todoType";

export type Modal = {
  visible: boolean;
  data?: Todo;
  type: string;
};
