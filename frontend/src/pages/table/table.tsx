import React, { useCallback, useEffect } from "react";
import Box, { Item } from "devextreme-react/box";

import { setStatusSortData, status } from "../../utils/sortStatusData";
import { useZustandStore } from "../../data/data";
import { TableTextColumn } from "../../components/table/TableTextColumn/TableTextColumn";
import { TableStatusColumn } from "../../components/table/TableStatusColumn/TableStatusColumn";

import { Popup, Position } from "devextreme-react/popup";
import { EditModal } from "../../components/modal/editModal";
import "../../components/table/table.css";
import { Todo } from "../../../../backend/src/types/todoTypes";
import uuid4 from "uuid4";

import { sortTextData } from "../../utils/sortTextData";
import { TableActionColumn } from "../../components/table/TableActionColumn/TableActionColumn";
import { DeleteModal } from "../../components/modal/deleteModal";
import useWindowDimensions from "../../hook/useDimension";
import fetch from "node-fetch";
export default function Table() {
  const popup = useZustandStore((state) => state.popup);
  const hideInfo = useCallback(() => {
    useZustandStore.setState({ popup: { ...popup, visible: false, type: "" } });
  }, [popup]);

  const data = useZustandStore((state) => state.data);
  const setData = useZustandStore((state) => state.setData);
  const sortingPosition = useZustandStore((state) => state.sortingPosition);
  const setSortingPosition = useZustandStore(
    (state) => state.setSortingPosition
  );
  const rawData = useZustandStore((state) => state.rawData);
  const setRawData = useZustandStore((state) => state.setRawData);
  const [createdData, setCreatedData] = React.useState<Todo>({
    description: "",
    status: "",
    created_at: "",
    updated_at: "",
    id: "",
  });

  const sortTextDataFunc = sortTextData;
  const setStatusSortDataFunc = setStatusSortData;
  const dimensions = useWindowDimensions();

  const isBigScreen = (dimensions.width || 0) > 750;
  useEffect(() => {
    (async () => {
      const tempData = localStorage.getItem("data");
      if (tempData && tempData !== "undefined") {
        const data = JSON.parse(tempData);
        if (data?.value) {
          setRawData(data?.value);
        }
      }

      try {
        const realData = (await fetch(
          "http://localhost:3001/api/database/post/getJobListWithFilter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .catch((err: any) => console.log("error", err))) as unknown as {
          value: Todo[];
        };
        if (realData?.value?.length > 0) {
          localStorage.setItem("data", JSON.stringify(realData.value));
          setRawData(realData.value);
        }
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, [setRawData]);

  useEffect(() => {
    if (rawData?.length) {
      let data = JSON.parse(JSON.stringify([...rawData])) as Todo[];

      if (sortingPosition.priority !== "Priority(All)") {
        data = data.filter((d) => d.status === sortingPosition.priority);
      }

      if (sortingPosition.search) {
        data = data.filter((d) => {
          const desc = d.description.toLowerCase().trim();
          const search = sortingPosition.search.toLowerCase().trim();
          return desc.includes(search);
        });
      }

      if (sortingPosition.field !== "status") {
        data = sortTextDataFunc(
          data,
          sortingPosition.position,
          sortingPosition.field
        );
      } else {
        data = setStatusSortDataFunc(
          data,
          sortingPosition.position,
          sortingPosition.field
        );
      }

      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setData,
    setStatusSortDataFunc,
    sortTextDataFunc,
    sortingPosition,
    rawData,
  ]);

  return !rawData?.length ? null : (
    <React.Fragment>
      <h2
        style={{
          paddingLeft: "10px",
        }}
      >
        Add Data
      </h2>
      <Box
        direction={isBigScreen ? "row" : "col"}
        width="100%"
        height={isBigScreen ? undefined : 150}
        style={{
          gap: "10px",

          padding: "10px",
        }}
      >
        <Item ratio={isBigScreen ? 4 : 1}>
          <input
            value={createdData?.description}
            type="text"
            placeholder="Description"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #e4eafd",
            }}
            onChange={(e) => {
              let descData = e.target.value;

              if (String(descData).length > 255) {
                descData = descData.substring(0, 255);
              }
              setCreatedData({
                description: descData,
                status: createdData?.status || "",
                created_at: "",
                updated_at: "",
                id: "",
              });
            }}
          />
        </Item>

        <Item ratio={1}>
          <div>
            <select
              name="status"
              id="status"
              value={createdData?.status}
              onChange={(e) => {
                setCreatedData({
                  status: e.target.value,
                  created_at: "",
                  updated_at: "",
                  description: createdData?.description || "",
                  id: "",
                });
              }}
            >
              {status.map((s) => {
                return (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                );
              })}
            </select>
          </div>
        </Item>

        <Item ratio={1}>
          <button
            style={{
              background: "#2277E0",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={() => {
              console.log("click");
              const id = uuid4();
              const created_at = new Date().toISOString();
              const updated_at = new Date().toISOString();
              createdData &&
                createdData.description &&
                setRawData([
                  ...rawData,
                  {
                    ...createdData,
                    id,
                    created_at,
                    updated_at,

                    description: createdData.description,
                    status: createdData.status || "Urgent",
                  },
                ]);

              setCreatedData({
                description: "",
                status: "",
                created_at: "",
                updated_at: "",
                id: "",
              });
            }}
          >
            + Create
          </button>
        </Item>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            paddingLeft: "10px",
          }}
        >
          Job List
        </h2>
        <h2
          style={{
            paddingRight: "10px",
          }}
        >
          {`${data.length}/${rawData.length}`}
        </h2>
      </div>

      <Box
        style={{
          marginBottom: "10px",
        }}
      >
        <Item ratio={3}>
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #e4eafd",
            }}
            onChange={(e) => {
              setSortingPosition({
                ...sortingPosition,
                search: e.target.value,
              });
            }}
          />
        </Item>
        <Item ratio={2}>
          <div
            style={{
              paddingRight: "5px",
              paddingLeft: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <select
              name="status"
              id="status"
              onChange={(e) => {
                setSortingPosition({
                  ...sortingPosition,
                  priority: e.target.value,
                });
              }}
            >
              <option value={"Priority(All)"}>{"Priority(All)"}</option>
              {status.map((s) => {
                return (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                );
              })}
            </select>
          </div>
        </Item>
      </Box>
      <Box direction="row" width="100%">
        {isBigScreen && (
          <Item ratio={2}>
            <TableTextColumn field="id" />
          </Item>
        )}

        <Item ratio={2}>
          <TableTextColumn field="description" />
        </Item>

        <Item ratio={2}>
          <TableStatusColumn field="status" />
        </Item>

        {isBigScreen && (
          <Item ratio={2}>
            <TableTextColumn field="updated_at" isDate={true} />
          </Item>
        )}

        {isBigScreen && (
          <Item ratio={2}>
            <TableTextColumn field="created_at" isDate={true} />
          </Item>
        )}

        <Item ratio={2}>
          <TableActionColumn />
          <Popup
            visible={popup.visible}
            onHiding={hideInfo}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title={popup.type}
            container=".dx-viewport"
            width={isBigScreen ? 600 : 300}
            height={300}
          >
            <Position at="center" my="center" collision="fit" />

            {popup.type === "Edit" && <EditModal />}
            {popup.type === "Delete" && <DeleteModal />}
          </Popup>
        </Item>
      </Box>
    </React.Fragment>
  );
}
