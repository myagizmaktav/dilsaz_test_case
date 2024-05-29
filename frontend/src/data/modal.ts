import { Modal } from "@/types/modalType";
import { atom } from "jotai";

export const modalAtom = atom<Modal>({
  visible: false,

  type: "",
});
