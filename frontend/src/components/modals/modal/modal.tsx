import { modalAtom } from "@/data/modal";
import { useAtom } from "jotai";

import ReactModal from "react-modal";
import { AddModal } from "../addModal/addModal";
import { DeleteModal } from "../deleteModal/deleteModal";
import { EditModal } from "../editModal/editModal";
import { CloseIcon } from "@/assets/closeIcon";

import styles from "./modal.module.scss";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function Modal() {
  const [popup, setPopup] = useAtom(modalAtom);
  ReactModal.setAppElement("main");
  const hideInfo = () => {
    setPopup({
      visible: false,
      type: "",
    });
  };

  return (
    <div>
      <ReactModal
        isOpen={popup.visible}
        onRequestClose={() => {}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.modalWrapper}>
          <div className={styles.titleWrapper}>
            <p>EDIT</p>

            <div onClick={hideInfo}>
              <CloseIcon />
            </div>
          </div>
          <div className={styles.modalBar} />

          {popup.type === "Add" && <AddModal />}
          {popup.type === "Delete" && <DeleteModal />}
          {popup.type === "Edit" && <EditModal />}
        </div>
      </ReactModal>
    </div>
  );
}
