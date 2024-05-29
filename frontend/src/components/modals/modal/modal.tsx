import { modalAtom } from "@/data/modal";
import { useAtom } from "jotai";

import ReactModal from "react-modal";
import { AddModal } from "../addModal";
import { DeleteModal } from "../deleteModal";
import { EditModal } from "../editModal";
import { CloseIcon } from "@/assets/closeIcon";

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
        <div
          style={{
            minWidth: "300px",
            minHeight: "200px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{}EDIT</p>

            <div onClick={hideInfo}>
              <CloseIcon />
            </div>
          </div>
          <div
            style={{
              borderBottom: "1px solid black",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />

          {popup.type === "Add" && <AddModal />}
          {popup.type === "Delete" && <DeleteModal />}
          {popup.type === "Edit" && <EditModal />}
        </div>
      </ReactModal>
    </div>
  );
}
