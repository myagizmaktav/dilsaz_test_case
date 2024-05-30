import dynamic from "next/dynamic";

const DynamicModal = dynamic(
  //@ts-ignore
  () => import("../modals/modal/modal").then((mod) => mod.default),
  {
    suspense: false,
  }
);

export default DynamicModal;
