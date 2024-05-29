import { modalAtom } from "@/data/modal";
import { todoAtom, rawTodoAtom } from "@/data/todo";
import { useAtom, useAtomValue } from "jotai";
import { priorityAtom } from "@/data/priority";
import { Select } from "../select/select";
import { useState } from "react";
import { Button } from "../button/button";

export const EditModal = () => {
  const [popup, setPopup] = useAtom(modalAtom);
  const [data, setData] = useAtom(todoAtom);
  const status = useAtomValue(priorityAtom);
  const [rawData, setRawData] = useAtom(rawTodoAtom);
  const [value, setValue] = useState(popup?.data?.status || "");
  const popupData = popup.data;
  const hideInfo = () => {
    setPopup({
      visible: false,

      type: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Select
          value={value}
          options={status.map((s) => {
            return {
              label: s.status,
              value: s.status,
            };
          })}
          onchange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "5px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`ID :`}</p>{" "}
          {popupData?.id}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Description :`}</p>{" "}
          {popupData?.description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Updated At :`}</p>
          {popupData?.updated_at}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p
            style={{
              color: "gray",
              fontWeight: "bold",
            }}
          >{`Created At :`}</p>{" "}
          {popupData?.created_at}
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <Button
          title={"Save"}
          backgroundColor="blue"
          onclick={() => {
            const index = data.findIndex((d) => d.id === popupData?.id);
            const newData = [...data];
            console.log(newData[index].status);
            newData[index].status = value;
            setData(newData);
            const indexRaw = rawData.findIndex((d) => d.id === popupData?.id);
            const newRawData = [...rawData];
            newRawData[indexRaw].status = value;
            setRawData(newRawData);
            hideInfo();
          }}
        ></Button>
      </div>
    </div>
  );
};
